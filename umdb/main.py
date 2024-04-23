from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

from umdb.db import SessionLocal
import umdb.person.model as model
import umdb.person.schema as schema

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/persons/", response_model=list[schema.Person])
def list_persons(db: Session = Depends(get_db)):
    return db.query(model.Person).all()
