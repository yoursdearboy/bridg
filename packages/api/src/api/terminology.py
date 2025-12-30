import bridg
from fastapi import Depends
from sqlalchemy.orm import Session

from .db import get_db


def get_terminology(db: Session = Depends(get_db)):
    return bridg.TerminologyService(db)
