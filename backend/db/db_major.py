from sqlalchemy.orm import Session
from db.models import Major
from fastapi import HTTPException, status

# 여기다 전공 관련 ORM 함수를 작성해주시면 됩니다.

def db_get_majors(db: Session, match: str):
    query = db.query(Major)

    if match:
        query = query.filter("%{}%".format(match))

    return query.all()

