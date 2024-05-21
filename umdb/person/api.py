from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import orm

from umdb.db import get_db
from umdb.util import setattrs

from . import model, schema


router = APIRouter()


@router.get("/", response_model=list[schema.Person])
def index(db: orm.Session = Depends(get_db)):
    return db.query(model.Person).all()


@router.get("/{id}", response_model=schema.Person)
def get(id: int, db: orm.Session = Depends(get_db)):
    person = db.query(model.Person).where(model.Person.id == id).first()
    if person is None:
        raise HTTPException(404)
    return person


@router.post("/{id}", response_model=schema.Person)
def update(id: int, body: schema.PersonUpdate, db: orm.Session = Depends(get_db)):
    person = db.query(model.Person).where(model.Person.id == id).first()
    if person is None:
        raise HTTPException(404)
    person = setattrs(person, body.model_dump())
    db.add(person)
    db.commit()
    db.refresh(person)
    return person
