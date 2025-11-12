from dataclasses import dataclass
from typing import Annotated

from bridg import ConceptDescriptorService
from fastapi import Depends
from sqlalchemy.orm import Session

from .cds import get_cds
from .db import get_db


@dataclass
class Context:
    db: Session
    cds: ConceptDescriptorService


def get_context(
    db: Annotated[Session, Depends(get_db)],
    cds: Annotated[ConceptDescriptorService, Depends(get_cds)],
):
    return Context(
        db=db,
        cds=cds,
    )
