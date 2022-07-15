from sqlalchemy.orm import Session
from db.models import Certificate
from fastapi import HTTPException, status

# 여기다 전공 관련 ORM 함수를 작성해주시면 됩니다.

def db_get_certificates(db: Session, match: str):
    query = db.query(Certificate)

    if match:
        query = query.filter(Certificate.name.op('regexp')(f'^{match}.*$'))
        return query.all()

