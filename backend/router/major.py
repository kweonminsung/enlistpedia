from fastapi import APIRouter
from db import db_major

router = APIRouter(
    prefix="/majors",
    tags=["major"]
)

@router.get("/", summary="Get all major list")
def get_majors():
    return db_major.get_majors()