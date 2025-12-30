from fastapi import Depends
from sqlalchemy.orm import Session

import bridg.alchemy

from .db import get_db


def get_terminology(db: Session = Depends(get_db)):
    return bridg.alchemy.TerminologyService(db)
