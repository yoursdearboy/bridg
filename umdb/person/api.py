from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import orm

from umdb.db import get_db
from umdb.person import model, schema
from umdb.util import setattrs


router = APIRouter(prefix="/persons", tags=["persons"])


@router.get("/", response_model=list[schema.Person])
def index(db: orm.Session = Depends(get_db)):
    return db.query(model.Person).all()


@router.post("/", response_model=schema.Person)
def create(body: schema.PersonCreate, db: orm.Session = Depends(get_db)):
    name = setattrs(model.Name(), body.name.model_dump())
    person = setattrs(model.Person(), body.model_dump(exclude="name"))
    person.names.append(name)
    db.add(person)
    db.commit()
    db.refresh(person)
    return person


@router.get("/{id}", response_model=schema.Person)
def read(id: int, db: orm.Session = Depends(get_db)):
    person = db.query(model.Person).where(model.Person.id == id).first()
    if person is None:
        raise HTTPException(404)
    return person


@router.patch("/{id}", response_model=schema.Person)
def update(id: int, body: schema.PersonUpdate, db: orm.Session = Depends(get_db)):
    person = db.query(model.Person).where(model.Person.id == id).first()
    if person is None:
        raise HTTPException(404)
    person = setattrs(person, body.model_dump())
    db.add(person)
    db.commit()
    db.refresh(person)
    return person


@router.delete("/{id}")
def delete(id: int, db: orm.Session = Depends(get_db)):
    person = db.query(model.Person).where(model.Person.id == id).first()
    if person is None:
        raise HTTPException(404)
    db.delete(person)
    db.commit()
