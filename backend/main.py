from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import certificate, etc, major, specialty

from db import models
from db.database import engine

app = FastAPI()


# 데이터베이스 생성
models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3000",
    "http://enlistpedia.org:80"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def index():
    return {"msg": "[Enlistpedia]: Hello World!"}

app.include_router(certificate.router)
app.include_router(etc.router)
app.include_router(major.router)
app.include_router(specialty.router)