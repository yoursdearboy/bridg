from dataclasses import dataclass
from typing import Annotated, Protocol

from fastapi import Depends
from sqlalchemy.orm import Session

from bridg.alchemy import TerminologyService

from .db import get_db
from .terminology import get_terminology


@dataclass
class Context:
    db: Session
    terminology: TerminologyService


class HasSession(Protocol):
    db: Session


class HasTerminology(Protocol):
    terminology: TerminologyService


def get_context(
    db: Annotated[Session, Depends(get_db)],
    terminology: Annotated[TerminologyService, Depends(get_terminology)],
):
    return Context(
        db=db,
        terminology=terminology,
    )
