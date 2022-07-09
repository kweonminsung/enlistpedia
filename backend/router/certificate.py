from fastapi import APIRouter
from db import db_certificate

router = APIRouter(
    prefix="/certificates",
    tags=["certificate"]
)

@router.get("/", summary="Get all certificate list")
def get_certificates():
    return db_certificate.db_get_certificates()