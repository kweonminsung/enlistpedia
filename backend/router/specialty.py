from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_specialty

router = APIRouter(
    prefix="/specialties",
    tags=["specialty"]
)

@router.get("/", summary="Get every applicable MOS info and score info")
def get_specialties(db: Session = Depends(get_db)):
    return db_specialty.get_specialties(db)