from sqlalchemy.orm import Session
from db.models import Major
from fastapi import HTTPException, status

# 여기다 전공 관련 ORM 함수를 작성해주시면 됩니다.

def db_get_majors(search : str, db: Session):
    search = "%{}%".format(search)
    majors = db.query(Major).filter(Major.name.like(search)).all()
    return majors

