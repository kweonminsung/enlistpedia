from fastapi import APIRouter
from db import db_hits

router = APIRouter(
    prefix="",
    tags=["etc"]
)

@router.get("/hits", summary="Get search count")
def get_hits():
    return db_hits.get_hits()

@router.post("/hits", summary="Post search count increment")
def increase_hits():
    return db_hits.increase_hits()