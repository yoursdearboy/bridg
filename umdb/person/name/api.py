from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import orm

from umdb.common.name import model
from umdb.db import get_db
from umdb.person.name import schema
from umdb.util import setattrs

router = APIRouter(prefix="/persons/{person_id}/names", tags=["names"])


@router.get("/", response_model=list[schema.Name])
def index(person_id: int, db: orm.Session = Depends(get_db)):
    return db.query(model.Name).where(model.Name.person_id == person_id).all()


@router.get("/{id}", response_model=schema.Name)
def find(person_id: int, id: int, db: orm.Session = Depends(get_db)):
    name = db.query(model.Name).where(model.Name.id == id).first()
    if name is None:
        raise HTTPException(404)
    return name


@router.patch("/{id}", response_model=schema.Name)
def update(
    person_id: int,
    id: int,
    body: schema.NameUpdate,
    db: orm.Session = Depends(get_db),
):
    name = db.query(model.Name).where(model.Name.id == id).first()
    if name is None:
        raise HTTPException(404)
    name = setattrs(name, body.model_dump())
    db.add(name)
    db.commit()
    db.refresh(name)
    return name
