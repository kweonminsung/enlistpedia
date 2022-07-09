from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import os
import json


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_FILE = os.path.join(BASE_DIR, '../config.json')
configs=json.loads(open(CONFIG_FILE).read())


DB = ...
if os.getenv('APP_ENV') == 'production':
    print("Production DB")
    DB = configs["DB"]["production"]
else:
    print("Development DB")
    DB = configs["DB"]["development"]

# 군대에서 개발할 때는 위에꺼 주석 치고 밑에 꺼로 쓰세여
# DB = configs["DB"]["production"]

SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{DB['user']}:{DB['password']}@{DB['host']}:{DB['port']}/{DB['database']}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
