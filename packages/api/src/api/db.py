from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from .settings import Settings, get_settings


def get_db(settings: Settings = Depends(get_settings)):
    engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
    db = Session(engine)
    try:
        yield db
    finally:
        db.close()


def get_repository(cls):
    def f(db: Session = Depends(get_db)):
        return cls(db)

    return f
