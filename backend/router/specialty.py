from typing import Optional, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.schemas import SpecialtySearch, Specialty
from db.database import get_db
from db import db_specialty

import requests
import xmltodict
import datetime

router = APIRouter(
    prefix="/specialties",
    tags=["specialty"]
)


def get_current_applible_data():
    
    SERVICE_KEY = 'exMtVfp9DmlY3K9uosd+lTfMzhARSBztPIWcfNkIfvPhd2RVU5um5nScma04DvpsQorI5jfdXSnyH0FnxcEn/A=='
    APPLY_STATUS_INFO_URL = 'http://apis.data.go.kr/1300000/MJBGJWJeopSuHH3/list'

    params ={'serviceKey' : SERVICE_KEY, 'pageNo' : '1', 'numOfRows' : '1000' }

    response = requests.get(APPLY_STATUS_INFO_URL, params=params)
    response_dict = xmltodict.parse(response.content)

    data = response_dict['response']['body']['items']['item']
    
    result = []
    
    temp_date = '20220701'
    
    for _data in data:
        if datetime.datetime.strptime(_data['jeopsuJrdtm'], '%Y%m%d') >  datetime.datetime.today():
            result.append(_data['gsteukgiCd'])
    return result

@router.post("", summary="Get every applicable MOS info and score info", response_model=List[Specialty])
def get_specialties(body: SpecialtySearch, db: Session = Depends(get_db)):
    
    appliable_mma_id = get_current_applible_data()
    query = db_specialty.get_specialties(db, body)
    for data in query:
        if data.mma_id in appliable_mma_id:
            data.applicable = True
        mil_type = data.military_type_id
        spec_type = data.specialty_type
        if mil_type == 0:
            data.military_type = "육군"
            if not spec_type:
                data.specialty_type = "기술행정병"
                # 육군식 계산
                
            else:
                if spec_type == 1:
                    data.specialty_type = "전문특기병"
                else:
                    data.specialty_type = "카투사"
        elif mil_type == 1:
            data.military_type = "해군"
            if not spec_type:
                data.specialty_type = "기술병"
                if not data.perfect_score == -1:
                    pass
                    # 해군식 계산
                    
            else:
                data.specialty_type = "전문특기병"
        elif mil_type == 2:
            data.military_type = "공군"
            if not spec_type:
                data.specialty_type = "기술병"
                if not data.perfect_score == -1:
                    pass
                    # 공군식 계산
                
            else:
                data.specialty_type = "전문특기병"
        else:
            data.military_type = "해병"
            data.specialty_type = "기술병"
            if not data.perfect_score == -1:
                pass
                # 해병식 계산
    return query