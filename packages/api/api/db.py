from common.db import SessionLocal
from common.env import load_env
from fastapi import Depends
from sqlalchemy.orm import Session

load_env()


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
