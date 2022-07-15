from typing import Dict, List, Optional
from pydantic import BaseModel
from enum import IntEnum

# 가산점 정보
class ExtraPointInfo(BaseModel):
    specialty_id: int
    description: str
    score: int

# 특기 검색시 요청 Body
class SpecialtySearch(BaseModel):
    military_type: List[int]
    major_id: Optional[int] = None
    grade: Optional[int] = None
    certificates_id: List[int]
    absent_days: int
    extra_points: List[ExtraPointInfo]

class RecruitResult(BaseModel):
    enlist_date: str
    min_score: int
    class Config():
        orm_mode = True

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
    perfect_score: int
    info_url: str
    comment: Optional[str] = None
    recruit_results: Optional[List[RecruitResult]] = None
    applicable: Optional[bool] = False
    score_data: Optional[List[ScoreData]] = None
    my_tot_score: Optional[int] = None
    class Config():
        orm_mode = True
    
