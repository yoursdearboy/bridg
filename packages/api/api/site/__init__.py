from typing import Annotated, List
from uuid import UUID

import bridg
from bridg import Repository
from fastapi import APIRouter, Depends

from api.db import get_repository
from api.model import StudySiteProtocolVersionRelationship

router = APIRouter(prefix="/sites", tags=["sites"])


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
