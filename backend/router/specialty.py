from typing import Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.schemas import SpecialtySearch, SpecialtyList
from db.database import get_db
from db import db_specialty

router = APIRouter(
    prefix="/specialties",
    tags=["specialty"]
)

@router.post("", summary="Get every applicable MOS info and score info", response_model=SpecialtyList)
def get_specialties(body: SpecialtySearch, db: Session = Depends(get_db)):
    return db_specialty.get_specialties(db, body)