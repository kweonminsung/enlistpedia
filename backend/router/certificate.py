from typing import Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db import db_certificate

router = APIRouter(
    prefix="/certificates",
    tags=["certificate"]
)

@router.get("", summary="Get all certificate list")
def get_certificates(match: Optional[str] = None, db : Session = Depends(get_db)):
    return db_certificate.db_get_certificates(db, match)