from fastapi import APIRouter, Depends
from sqlalchemy import orm

from umdb.db import get_db

from . import model, schema


router = APIRouter()


@router.get("/", response_model=list[schema.Person])
def index(db: orm.Session = Depends(get_db)):
    return db.query(model.Person).all()


@router.get("/{id}", response_model=schema.Person)
def get(id: int, db: orm.Session = Depends(get_db)):
    return db.query(model.Person).where(model.Person.id == id).first()
