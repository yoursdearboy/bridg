from typing import Annotated, List, Optional
from uuid import UUID

import bridg
from bridg.repository import Repository
from fastapi import APIRouter, Depends, HTTPException

from api.db import get_repository
from api.model import StudyActivity

from . import result

router = APIRouter(prefix="/activity", tags=["space_activity"])


class StudyActivityRepository(Repository[bridg.StudyActivity]):
    _sa = bridg.StudyActivity


StudyActivityRepositoryDep = Annotated[StudyActivityRepository, Depends(get_repository(StudyActivityRepository))]


@router.get("")
def index(space_id: UUID, repo: StudyActivityRepositoryDep) -> List[StudyActivity]:
    objs = repo.all(bridg.StudyActivity.using_study_protocol_version_id == space_id)
    return [StudyActivity.model_validate(obj) for obj in objs]


@router.get("/{sa_id:uuid}")
def show(space_id: UUID, sa_id: UUID, repo: StudyActivityRepositoryDep) -> Optional[StudyActivity]:
    if obj := repo.one_or_none(sa_id):
        return StudyActivity.model_validate(obj)
    raise HTTPException(status_code=404)


router.include_router(result.router, prefix="/{sa_id:uuid}")

openapi_tags = [{"name": "space_activity"}, *result.openapi_tags]
