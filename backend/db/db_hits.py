from sqlalchemy.orm import Session
from db.models import Hits
from fastapi import HTTPException, status
# 여기다 hits 관련 ORM 함수를 작성해주시면 됩니다.

def get_hits(db: Session):
    query = db.query(Hits).filter(Hits.id==1)
    return query.first()

def increase_hits(db: Session):
    query = db.query(Hits).filter(Hits.id==1)
    if not query.first():
        raise HTTPException(status_code=404)
    query.first().count += 1
    db.commit()
    
    return query.first().count