from typing import Dict, List, Optional
from pydantic import BaseModel

# 가산점 정보
class ExtraPointInfo(BaseModel):
    specialty_id: int
    description: str
    score: int

# 특기 검색시 요청 Body
class SpecialtySearch(BaseModel):
    military_type: List[int]
    major_id: int
    grade: int
    certificates_id: int
    absent_days: int
    extra_points: List[ExtraPointInfo]

class RecruitResult(BaseModel):
    enlist_date: str
    min_score: int

class ScoreData(BaseModel):
    article: str
    description: str
    score: int

# 지원 가능한 특기
class Specialty(BaseModel):
    military_type: str
    id: int
    name: str
    specialty_type: str
    applicable: bool
    my_tot_score: int
    perfect_score: int
    info_url: str
    comment: str
    previous_score_list: List[RecruitResult]
    score_data: List[ScoreData]

# 반환할 지원 가는 특기 리스트
class SpecialtyList(BaseModel):
    specialities: List[Specialty]