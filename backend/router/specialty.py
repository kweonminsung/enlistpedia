from typing import Optional, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.schemas import SpecialtySearch, Specialty
from db.database import get_db
from db import db_specialty

import requests
import xmltodict
import datetime
import time

router = APIRouter(
    prefix="/specialties",
    tags=["specialty"]
)


def get_current_applible_data():
    
    SERVICE_KEY = 'exMtVfp9DmlY3K9uosd+lTfMzhARSBztPIWcfNkIfvPhd2RVU5um5nScma04DvpsQorI5jfdXSnyH0FnxcEn/A=='
    APPLY_STATUS_INFO_URL = 'http://apis.data.go.kr/1300000/MJBGJWJeopSuHH3/list'

    result = []
    pageNo = 1
    while True:
        params ={'serviceKey' : SERVICE_KEY, 'pageNo' : pageNo, 'numOfRows' : 50}
        try:
            response = requests.get(APPLY_STATUS_INFO_URL, params=params, timeout = 0.7)
        except:
            time.sleep(0.1)
            continue
        response_dict = xmltodict.parse(response.content)
        try:
            data = response_dict['response']['body']['items']['item']
        except:
            
            break
        
        today = datetime.datetime.today()
        
        for _data in data:
            if datetime.datetime.strptime(_data['jeopsuSjdtm'], '%Y%m%d') <= today and today <= datetime.datetime.strptime(_data['jeopsuJrdtm'], '%Y%m%d'):
                result.append(_data['gsteukgiCd'])
        pageNo +=1 
    return result

def get_absent_score(military_type_id, is_normal, absent_day):
    score_data = {'article' : '고교 출결사항', 'description' : '', 'score': 0, 'perfect_score': 10}
    if is_normal: score_data['perfect_score'] = 20
    score = 0
    if military_type_id != 3:
        if absent_day == 0:
            score_data['description'] = '결석 0일'
            score = 10
        elif absent_day <= 2:
            score_data['description'] = '결석 1~2일'
            score = 9
        elif absent_day <= 4:
            score_data['description'] = '결석 3~4일'
            score = 8
        elif absent_day <= 6:
            score_data['description'] = '결석 5~6일'
            score = 7
        else:
            score_data['description'] = '결석 7일 이상'
            score = 6
        
        if is_normal:
            score_data['score'] = score + 10
            return score_data
        else:
            score_data['score'] = score
            return score_data
    else:
        if absent_day == 0:
            score_data['description'] = '결석 0일'
            score = 10
        elif absent_day <= 2:
            score_data['description'] = '결석 1~2일'
            score = 8
        elif absent_day <= 4:
            score_data['description'] = '결석 3~4일'
            score = 6
        elif absent_day <= 6:
            score_data['description'] = '결석 5~6일'
            score = 4
        elif absent_day <= 8:
            score_data['description'] = '결석 7일 이상'
            score = 2
        else:
            score_data['description'] = '결석 9일 이상'
            score = 1
        
            
        if is_normal:
            score_data['score'] = score + 10
            return score_data
        else:
            score_data['score'] = score
            return score_data

def get_major_score(grade:int):
    score_data = {'article' : '전공', 'description' : '', 'score': 0, 'perfect_score': 40}
    if grade == 1:
        score_data['score'] = 26
        score_data['description'] = '관련 전공 1학년 재학'
    elif grade == 2:
        score_data['score'] = 28
        score_data['description'] = '관련 전공 1학년 수료'
    elif grade == 3:
        score_data['score'] = 30
        score_data['description'] = '관련 전공 2학년 재학'
    elif grade == 4:
        score_data['score'] = 32
        score_data['description'] = '관련 전공 2학년 수료'
    elif grade == 5:
        score_data['score'] = 34
        score_data['description'] = '관련 전공 3학년 재학'
    elif grade == 6:
        score_data['score'] = 36
        score_data['description'] = '관련 전공 3학년 수료'
    elif grade == 7:
        score_data['score'] = 38
        score_data['description'] = '관련 전공 4학년 재학'
    else:
        score_data['score'] = 40
        score_data['description'] = '관련 전공 4학년 수료'
    
    return score_data

def get_army_certificate_score(max_rank: int, is_direct: bool, comment:str):
    score_data = {'article': '자격증/면허', 'description': comment, 'score': 0, 'perfect_score':50}
    if max_rank == 5:
        score_data['score'] = 50
        if not is_direct: 
            score_data['score'] -= 10
            score_data['description'] = '(간접) ' + score_data['description']
        else: score_data['description'] = '(직접) ' + score_data['description']
    elif max_rank == 4:
        score_data['score'] = 45
        if not is_direct: 
            score_data['score'] -= 10
            score_data['description'] = '(간접) ' + score_data['description']
        else: score_data['description'] = '(직접) ' + score_data['description']
    elif max_rank == 3:
        score_data['score'] = 40
        if not is_direct: 
            score_data['score'] -= 10
            score_data['description'] = '(간접) ' + score_data['description']
        else: score_data['description'] = '(직접) ' + score_data['description']
    else:
        if not is_direct:
            score_data['score'] = 25
            score_data['description'] = '(간접) ' + score_data['description']
        else:
            if max_rank == 2:
                score_data['score'] = 30
            elif max_rank == 1:
                score_data['score'] = 26
            score_data['description'] = '(직접) ' + score_data['description']        
    return score_data

def get_else_certificate_score(max_rank: int, is_normal: bool, comment: str):
    score_data = {'article': '자격증/면허', 'description': comment, 'score': 0, 'perfect_score': 50}
    if is_normal: score_data['perfect_score'] = 70
    

    if max_rank == 5:
        score_data['score'] = 50
        if is_normal: score_data['score'] = 70
    elif max_rank == 4:
        score_data['score'] = 45
        if is_normal: score_data['score'] = 68
    elif max_rank == 3:
        score_data['score'] = 40
        if is_normal: score_data['score'] = 66
    elif max_rank == 2:
        score_data['score'] = 30
        if is_normal: score_data['score'] = 64
    elif max_rank == 1:
        score_data['score'] = 26
        if is_normal: score_data['score'] = 62
    else:
        score_data['score'] = 20
        if is_normal: score_data['score'] = 60
        
    return score_data

@router.post("", summary="Get every applicable MOS info and score info", response_model=List[Specialty])
def get_specialties(body: SpecialtySearch, db: Session = Depends(get_db)):
    
    appliable_mma_id = get_current_applible_data()
    query, specialty_major, specialty_certificate = db_specialty.get_specialties(db, body)

    for data in query:
        if data.mma_id in appliable_mma_id:
            data.applicable = True
            
        if data.perfect_score == -1:
            data.perfect_score = None
            
        military_type = data.military_type_id
        specialty_type = data.specialty_type
        specialty_id = data.id
        if military_type == 0:
            data.military_type = "육군"
            if not specialty_type:
                my_tot_score = 0
                score_data = []
                data.specialty_type = "기술행정병"
                
                # 육군식 계산

                # 출결
                absent_result = get_absent_score(military_type,0,body.absent_days)                
                score_data.append(absent_result)
                my_tot_score += absent_result['score']

                # 전공
                if specialty_id != 84: # 운전병 아닐 경우
                    if specialty_id in specialty_major:
                        result = db_specialty.get_specialty_major_info(db, specialty_id, body.major_id)
                        major_result = get_major_score(body.grade)     
                    else:
                        major_result = {'article' : '전공', 'description' : '비전공', 'score': 20, 'perfect_score': 40}
                
                    score_data.append(major_result)
                    my_tot_score += major_result['score']
                
                
                # 자격증
                if specialty_id in specialty_certificate:
                    result = db_specialty.get_specialty_certificate_info(db, specialty_id, body.certificates_id)
                    if specialty_id != 84: # 운전병 아닐 경우 
                        certificate_result = get_army_certificate_score(result['rank'],result['is_direct'],result['comment'])
                    else:
                        certificate_result = {'article': '자격증/면허', 'description': '', 'score': 0, 'perfect_score':90}
                        certificate_result['description'] = result['comment']
                        if result['rank'] == 5:
                            certificate_result['score'] = 90
                            
                        elif result['rank'] == 4:
                            certificate_result['score'] = 87
                            
                        elif result['rank'] == 3:
                            certificate_result['score'] = 85
                        else:
                            certificate_result['score'] = 0
                        
                else:
                    certificate_result = {'article': '자격증/면허', 'description': '미소지', 'score': 20, 'perfect_score':50}

                score_data.append(certificate_result)
                my_tot_score += certificate_result['score']

                # 가산점
                tot_extra_points = 0
                for points in body.extra_points:
                    if points.specialty_id == -1 or points.specialty_id == data.id:
                        if (tot_extra_points + points.score) > 15: break
                        else:
                            tot_extra_points += points.score
                        score_data.append({'article':'가산점','description':points.description, 'score':points.score})
                
                my_tot_score += tot_extra_points            
                
                data.my_tot_score = my_tot_score
                data.score_data = score_data
                
            else:
                if specialty_type == 1:
                    data.specialty_type = "전문특기병"
                else:
                    data.specialty_type = "카투사"
        
        elif military_type == 1:
            data.military_type = "해군"
            if not specialty_type:
                data.specialty_type = "기술병"
                if data.perfect_score:
                    my_tot_score = 0
                    score_data = []
                    
                    # 해군식 계산
                    
                    
                    if specialty_id == 223:
                        # 출결
                        
                        absent_result = get_absent_score(military_type,1,body.absent_days)      
                        score_data.append(absent_result)
                        
                        my_tot_score += absent_result['score']
                        
                        # 자격증
                        if specialty_id in specialty_certificate:
                            result = db_specialty.get_specialty_certificate_info(db, specialty_id, body.certificates_id)
                            certificate_result = get_else_certificate_score(result['rank'],1,result['comment'])
                        else:
                            certificate_result = {'article': '자격증/면허', 'description': '미소지', 'score': 60, 'perfect_score': 70}
                            
                            
                        score_data.append(certificate_result)
                        my_tot_score += certificate_result['score']
                    
                    else:
                        # 출결
                        absent_result = get_absent_score(military_type,0,body.absent_days)                
                        score_data.append(absent_result)
                    
                        my_tot_score += absent_result['score']
                    
                        # 전공
                        if specialty_id in specialty_major:
                            result = db_specialty.get_specialty_major_info(db, specialty_id, body.major_id)
                            major_result = get_major_score(body.grade)     
                        else:
                            major_result = {'article' : '전공', 'description' : '비전공', 'score': 20, 'perfect_score': 40}
                
                        score_data.append(major_result)
                        my_tot_score += major_result['score']
                        
                        # 자격증
                    
                        if specialty_id in specialty_certificate:
                            result = db_specialty.get_specialty_certificate_info(db, specialty_id, body.certificates_id)
                            certificate_result = get_else_certificate_score(result['rank'],0,result['comment'])
                        else:
                            certificate_result = {'article': '자격증/면허', 'description': '미소지', 'score': 20, 'perfect_score': 50}
                            
                            
                        score_data.append(certificate_result)
                        my_tot_score += certificate_result['score']
                
                    # 가산점
                    
                    tot_extra_points = 0
                    for points in body.extra_points:
                        if points.specialty_id == -1 or points.specialty_id == data.id:
                            if (tot_extra_points + points.score) > 15: break
                            else: 
                                tot_extra_points += points.score
                            score_data.append({'article':'가산점','description':points.description, 'score':points.score})
                
                    my_tot_score += tot_extra_points  
                    
                    data.my_tot_score = my_tot_score
                    data.score_data = score_data
            else:
                data.specialty_type = "전문특기병"
        
        elif military_type == 2:
            data.military_type = "공군"
            if not specialty_type:
                data.specialty_type = "기술병"
                if data.perfect_score:
                    my_tot_score = 0
                    score_data = []
                    # 공군식 계산
                        
                    
                    if specialty_id == 253:
                        # 출결
                    
                        absent_result = get_absent_score(military_type,1,body.absent_days)                
                        score_data.append(absent_result)
                        my_tot_score += absent_result['score']

                        # 자격증
                        if specialty_id in specialty_certificate:
                            result = db_specialty.get_specialty_certificate_info(db, specialty_id, body.certificates_id)
                            certificate_result = get_else_certificate_score(result['rank'],1,result['comment'])
                        else:
                            certificate_result = {'article': '자격증/면허', 'description': '미소지', 'score': 60, 'perfect_score': 70}
                            
                            
                        score_data.append(certificate_result)
                        my_tot_score += certificate_result['score']
                        

                        
                    else:
                        # 출결
                        
                        absent_result = get_absent_score(military_type,0,body.absent_days)                
                        score_data.append(absent_result)
                        my_tot_score += absent_result['score']
                    
                        # 전공
                        if specialty_id in specialty_major:
                            result = db_specialty.get_specialty_major_info(db, specialty_id, body.major_id)
                            major_result = get_major_score(body.grade)     
                        else:
                            major_result = {'article' : '전공', 'description' : '비전공', 'score': 20, 'perfect_score': 40}
                
                        score_data.append(major_result)
                        my_tot_score += major_result['score']
                        
                        # 자격증
                        if specialty_id in specialty_certificate:
                            result = db_specialty.get_specialty_certificate_info(db, specialty_id, body.certificates_id)
                            certificate_result = get_else_certificate_score(result['rank'],0,result['comment'])
                        else:
                            certificate_result = {'article': '자격증/면허', 'description': '미소지', 'score': 20, 'perfect_score': 50}
                            
                            
                        score_data.append(certificate_result)
                        my_tot_score += certificate_result['score']
                        
                    # 가산점
                    tot_extra_points = 0
                    for points in body.extra_points:
                        if points.specialty_id == -1 or points.specialty_id == data.id:
                            if (tot_extra_points + points.score) > 15: break
                            else:
                                tot_extra_points += points.score
                            score_data.append({'article':'가산점','description':points.description, 'score':points.score})
                
                    my_tot_score += tot_extra_points 


                    data.my_tot_score = my_tot_score
                    data.score_data = score_data
            else:
                data.specialty_type = "전문특기병"
        else:
            data.military_type = "해병"
            data.specialty_type = "기술병"
            if data.perfect_score:
                my_tot_score = 0
                score_data = []
                # 해병식 계산
                
                # 출결
                if specialty_id == 280 or specialty_id == 282:
                    # 출결
                    absent_result = get_absent_score(military_type,1,body.absent_days)                
                    score_data.append(absent_result)
                    my_tot_score += absent_result['score']
                    
                    # 자격증
                    if specialty_id in specialty_certificate:
                        result = db_specialty.get_specialty_certificate_info(db, specialty_id, body.certificates_id)
                        certificate_result = get_else_certificate_score(result['rank'],1,result['comment'])
                    else:
                        certificate_result = {'article': '자격증/면허', 'description': '미소지', 'score': 60, 'perfect_score': 70}
                        
                        
                    score_data.append(certificate_result)
                    my_tot_score += certificate_result['score']
                
                else:
                    # 출결
                    absent_result = get_absent_score(military_type,0,body.absent_days)                
                    score_data.append(absent_result)
                    my_tot_score += absent_result['score']
                    
                    # 전공
                    if specialty_id in specialty_major:
                        result = db_specialty.get_specialty_major_info(db, specialty_id, body.major_id)
                        major_result = get_major_score(body.grade)     
                    else:
                        major_result = {'article' : '전공', 'description' : '비전공', 'score': 20, 'perfect_score': 40}
                
                    score_data.append(major_result)
                    my_tot_score += major_result['score']
                        
                    # 자격증
                    if specialty_id in specialty_certificate:
                        result = db_specialty.get_specialty_certificate_info(db, specialty_id, body.certificates_id)
                        certificate_result = get_else_certificate_score(result['rank'],0,result['comment'])
                    else:
                        certificate_result = {'article': '자격증/면허', 'description': '미소지', 'score': 20, 'perfect_score': 50}

                    score_data.append(certificate_result)
                    my_tot_score += certificate_result['score']
                    
     
                # 가산점
     
                tot_extra_points = 0
                for points in body.extra_points:
                    if points.specialty_id == -1 or points.specialty_id == data.id:
                        if (tot_extra_points + points.score) > 15: break
                        else:
                            tot_extra_points += points.score
                        score_data.append({'article':'가산점','description':points.description, 'score':points.score})
                
                my_tot_score += tot_extra_points 
                
                data.my_tot_score = my_tot_score
                data.score_data = score_data

    return query
