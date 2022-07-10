from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_major

router = APIRouter(
    prefix="/majors",
    tags=["major"]
)

@router.get("/", summary="Get all major list")
def get_majors(search: str, db: Session = Depends(get_db)):
    return db_major.db_get_majors(search, db)