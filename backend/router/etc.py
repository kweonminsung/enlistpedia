from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_hits

router = APIRouter(
    prefix="",
    tags=["etc"]
)

@router.get("/hits", summary="Get search count")
def get_hits(db: Session = Depends(get_db)):
    return db_hits.get_hits(db)

@router.post("/hits", summary="Post search count increment")
def increase_hits(db: Session = Depends(get_db)):
    return db_hits.increase_hits(db)