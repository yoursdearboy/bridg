from typing import Annotated, List
from uuid import UUID

import bridg
from bridg import Repository
from fastapi import APIRouter, Depends
from pydantic import field_validator
from sqlalchemy.orm import Session

from api.base_model import BaseModel
from api.db import get_repository

router = APIRouter(prefix="/sites", tags=["sites"])


class StudySiteProtocolVersionRelationship(BaseModel):
    id: UUID
    executing_study_site: str

    @field_validator("executing_study_site", mode="before")
    @classmethod
    def convert_study_site(cls, ss: bridg.StudySite):
        return str(ss.performing_entity)


class StudySiteProtocolVersionRelationshipRepository(Repository[bridg.StudySiteProtocolVersionRelationship]):
    _sa = bridg.StudySiteProtocolVersionRelationship


StudySiteProtocolVersionRelationshipRepositoryDep = Annotated[
    StudySiteProtocolVersionRelationshipRepository,
    Depends(get_repository(StudySiteProtocolVersionRelationshipRepository)),
]


@router.get("")
def index(
    space_id: UUID, repo: StudySiteProtocolVersionRelationshipRepositoryDep
) -> List[StudySiteProtocolVersionRelationship]:
    objs = repo.all(bridg.StudySiteProtocolVersionRelationship.executed_study_protocol_version_id == space_id)
    return [StudySiteProtocolVersionRelationship.model_validate(o) for o in objs]
