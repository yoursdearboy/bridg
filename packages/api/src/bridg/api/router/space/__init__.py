from typing import Annotated, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

import bridg.alchemy
from bridg.alchemy import Repository
from bridg.api.db import get_repository
from bridg.api.model import Epoch, StudyProtocolVersion, StudySiteProtocolVersionRelationship

from . import activity, subject

router = APIRouter(prefix="/space")


class StudyProtocolVersionRepository(Repository[bridg.alchemy.StudyProtocolVersion]):
    _sa = bridg.alchemy.StudyProtocolVersion


StudyProtocolVersionRepositoryDep = Annotated[
    StudyProtocolVersionRepository, Depends(get_repository(StudyProtocolVersionRepository))
]


@router.get("", operation_id="list_space")
def index(repo: StudyProtocolVersionRepositoryDep) -> List[StudyProtocolVersion]:
    objs = repo.all()
    return [StudyProtocolVersion.model_validate(o) for o in objs]


space_router = APIRouter(prefix="/{space_id:uuid}")


@space_router.get("/epoch", operation_id="list_space_epoch")
def index_epoch(space_id: UUID, repo: StudyProtocolVersionRepositoryDep) -> List[Epoch]:
    if space := repo.one_or_none(space_id):
        return [Epoch.model_validate(x) for x in space.subdividing_epoch]
    raise HTTPException(status_code=404)


@space_router.get("/site", operation_id="list_space_site")
def index_site(space_id: UUID, repo: StudyProtocolVersionRepositoryDep) -> List[StudySiteProtocolVersionRelationship]:
    if space := repo.one_or_none(space_id):
        return [
            StudySiteProtocolVersionRelationship.model_validate(x)
            for x in space.executing_study_site_protocol_version_relationship
        ]
    raise HTTPException(status_code=404)


space_router.include_router(subject.router)
space_router.include_router(activity.router)

router.include_router(space_router)
