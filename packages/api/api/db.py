import os

from common.env import load_env
from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

load_env(prefix="BRIDG")

DATABASE_URI = os.environ["BRIDG_SQLALCHEMY_DATABASE_URI"]

engine = create_engine(DATABASE_URI)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_repository(cls):
    def f(db: Session = Depends(get_db)):
        return cls(db)

    return f
