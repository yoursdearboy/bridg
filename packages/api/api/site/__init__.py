from typing import List
from uuid import UUID

import bridg
from fastapi import APIRouter, Depends
from pydantic import field_validator
from sqlalchemy.orm import Session

from api.base_model import BaseModel
from api.db import get_db

router = APIRouter(prefix="/sites", tags=["sites"])


class StudySiteProtocolVersionRelationship(BaseModel):
    id: UUID
    executing_study_site: str

    @field_validator("executing_study_site", mode="before")
    @classmethod
    def convert_study_site(cls, ss: bridg.StudySite):
        return str(ss.performing_entity)


@router.get("", response_model=List[StudySiteProtocolVersionRelationship])
def index(space_id: UUID, db: Session = Depends(get_db)):
    return db.query(bridg.StudySiteProtocolVersionRelationship).filter(
        bridg.StudySiteProtocolVersionRelationship.executed_study_protocol_version_id == space_id
    )
