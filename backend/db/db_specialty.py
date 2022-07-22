from sqlalchemy.orm import Session
from db.models import Specialty, SpecialtyCertificate, SpecialtyMajor, Major, Certificate
from db.schemas import SpecialtySearch
from fastapi import HTTPException
from typing import List
# 여기다 특기 관련 ORM 함수를 작성해주시면 됩니다.
# class SpecialtySearch(BaseModel):
#     military_type: List[int]
#     major_id: int
#     grade: int
#     certificates_id: List[int]
#     absent_days: int
#     extra_points: List[ExtraPointInfo]

def get_specialty_major_info(db: Session, specialty_id: int, major_id: int):
    
    query = db.query(SpecialtyMajor).filter(SpecialtyMajor.specialty_id == specialty_id).filter(SpecialtyMajor.major_id == major_id).first()
    
    result = {'is_direct': query.is_direct}
    return result



def get_army_specialty_certificate_info(db:Session, specialty_id: int, certificates_id_list: List[int]):
    ARMY_SCORE = [[0,25,25,30,35,40],[0,26,30,40,45,50]]
    query = db.query(SpecialtyCertificate).filter(SpecialtyCertificate.specialty_id == specialty_id).filter(SpecialtyCertificate.certificate_id.in_(certificates_id_list)).all()

    result = {'is_direct': False, 'rank': 0, 'comment': ''}
    max_score = -1
    for data in query:
        if not data.is_direct: score = ARMY_SCORE[0][data.rank]# 간접
        else: score = ARMY_SCORE[1][data.rank]
        
        if score > max_score:
            result['is_direct'] = data.is_direct
            result['rank'] = data.rank
            result['comment'] = data.comment
        
def get_specialty_certificate_info(db:Session, specialty_id: int, certificates_id_list: List[int]):
    
    query = db.query(SpecialtyCertificate).filter(SpecialtyCertificate.specialty_id == specialty_id).filter(SpecialtyCertificate.certificate_id.in_(certificates_id_list)).all()
    
    result = {'is_direct': False, 'rank': 0, 'comment': ''}
    max_rank = -1
    for data in query:
        if data.rank > max_rank:
            max_rank = data.rank
            result['is_direct'] = data.is_direct
            result['rank'] = max_rank
            result['comment'] = data.comment
                
    return result

def get_specialties(db: Session, body: SpecialtySearch):
    if body.military_type == None:
        raise HTTPException(status_code=400)
    elif body.major_id and not body.grade:
        
        raise HTTPException(status_code=400)
    else:
        base_query = db.query(Specialty)
        
        type_query = base_query.filter(Specialty.military_type_id == body.military_type)
        
        non_eligible_query = type_query.filter(Specialty.has_eligibility == False)
        
        non_eligible_specialty_id = []
        
        for data in non_eligible_query.all():
            non_eligible_specialty_id.append(data.id)
        
        # 전공 x / 자격증 x 
        if body.major_id == None and body.certificates_id == []:
            query = non_eligible_query.all()
            
            return query, [], []
            
        elif body.major_id != None and body.certificates_id == []:
            # 전공으로 filter
          
            major_query = db.query(SpecialtyMajor).filter(SpecialtyMajor.major_id == body.major_id).all()
            
            major_specialty_id = []
            
            for data in major_query:
                major_specialty_id.append(data.specialty_id)
            
            result_id = list(set(non_eligible_specialty_id + major_specialty_id))
            
            query = type_query.filter(Specialty.id.in_(result_id)).all()

            return query, major_specialty_id, []
            
        elif body.major_id == None and body.certificates_id != []:
            # 자격증으로 filter

            certificate_query = db.query(SpecialtyCertificate).filter(SpecialtyCertificate.certificate_id.in_(body.certificates_id)).all()
            
            certificate_specialty_id = []
            
            for data in certificate_query:
                
                certificate_specialty_id.append(data.specialty_id)
                
            result_id = list(set(non_eligible_specialty_id + certificate_specialty_id))
            
            query = type_query.filter(Specialty.id.in_(result_id)).all()
            
            return query, [], list(set(certificate_specialty_id))
        else:
            major_query = db.query(SpecialtyMajor).filter(SpecialtyMajor.major_id == body.major_id).all()
            certificate_query = db.query(SpecialtyCertificate).filter(SpecialtyCertificate.certificate_id.in_(body.certificates_id)).all()
            
            major_specialty_id = []
            certificate_specialty_id = []
            
            for data in major_query:
                major_specialty_id.append(data.specialty_id)
            # 자격증으로 filter
            
            for data in certificate_query:
                certificate_specialty_id.append(data.specialty_id)
                
            result_id = list(set(non_eligible_specialty_id + major_specialty_id + certificate_specialty_id))
            
            query = type_query.filter(Specialty.id.in_(result_id)).all()
            
            return query, major_specialty_id, list(set(certificate_specialty_id))