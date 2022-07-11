from sqlalchemy.orm import Session
from db.models import Specialty
from db.schemas import SpecialtySearch

# 여기다 특기 관련 ORM 함수를 작성해주시면 됩니다.

def get_specialties(db: Session, body: SpecialtySearch):
    print(body)
    return db.query(Specialty).all()