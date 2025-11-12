import bridg
from fastapi import Depends
from sqlalchemy.orm import Session

from .db import get_db


def get_cds(db: Session = Depends(get_db)):
    return bridg.ConceptDescriptorService(db)
