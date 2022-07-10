from sqlalchemy.orm import Session
from db.models import Certificate
from fastapi import HTTPException, status

# 여기다 전공 관련 ORM 함수를 작성해주시면 됩니다.

def db_get_certificates(search : str, db: Session):
    search = "%{}%".format(search)
    certificates = db.query(Certificate).filter(Certificate.name.like(search)).all()
    return certificates

