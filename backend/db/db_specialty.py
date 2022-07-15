from sqlalchemy.orm import Session
from db.models import Specialty, SpecialtyCertificate, SpecialtyMajor, Major
from db.schemas import SpecialtySearch
from fastapi import HTTPException

# 여기다 특기 관련 ORM 함수를 작성해주시면 됩니다.
# class SpecialtySearch(BaseModel):
#     military_type: List[int]
#     major_id: int
#     grade: int
#     certificates_id: List[int]
#     absent_days: int
#     extra_points: List[ExtraPointInfo]

def get_specialties(db: Session, body: SpecialtySearch):
    if not body.military_type:
        raise HTTPException(status_code=400)
    else:
        base_query = db.query(Specialty)
        
        type_query = base_query.filter(Specialty.military_type_id.in_(body.military_type))
        
        non_eligible_query = type_query.filter(Specialty.has_eligibility == False)
        
        non_eligible_specialty_id = []
        
        for data in non_eligible_query.all():
            non_eligible_specialty_id.append(data.id)
        
        # 전공 x / 자격증 x 
        if body.major_id == None and body.certificates_id == []:
            query = non_eligible_query.all()
            return query
            
        elif body.major_id != None and body.certificates_id == []:
            # 전공으로 filter
            major_query = db.query(SpecialtyMajor).filter(SpecialtyMajor.major_id == body.major_id).all()
            
            major_specialty_id = []
            
            for data in major_query:
                major_specialty_id.append(data.specialty_id)
            
            result_id = list(set(non_eligible_specialty_id + major_specialty_id))
            
            query = type_query.filter(Specialty.id.in_(result_id)).all()

            return query
            
        elif body.major_id == None and body.certificates_id != []:
            # 자격증으로 filter
            certificate_query = db.query(SpecialtyCertificate).filter(SpecialtyCertificate.certificate_id.in_(body.certificates_id)).all()
            
            certificate_specialty_id = []
            
            for data in certificate_query:
                certificate_specialty_id.append(data.specialty_id)
                
            result_id = list(set(non_eligible_specialty_id + certificate_specialty_id))
            
            query = type_query.filter(Specialty.id.in_(result_id)).all()
            
            return query
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
            
            return query