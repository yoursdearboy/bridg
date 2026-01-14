from typing import Annotated, List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

import bridg.alchemy
from bridg.alchemy.repository import Repository
from bridg.api.db import get_repository
from bridg.api.model import StudyActivity

router = APIRouter(prefix="/activity")


class StudyActivityRepository(Repository[bridg.alchemy.StudyActivity]):
    _sa = bridg.alchemy.StudyActivity


StudyActivityRepositoryDep = Annotated[StudyActivityRepository, Depends(get_repository(StudyActivityRepository))]


@router.get("")
def index(space_id: UUID, repo: StudyActivityRepositoryDep) -> List[StudyActivity]:
    objs = repo.all(bridg.alchemy.StudyActivity.using_study_protocol_version_id == space_id)
    return [StudyActivity.model_validate(obj) for obj in objs]


@router.get("/{sa_id:uuid}")
def show(space_id: UUID, sa_id: UUID, repo: StudyActivityRepositoryDep) -> Optional[StudyActivity]:
    if obj := repo.one_or_none(sa_id):
        return StudyActivity.model_validate(obj)
    raise HTTPException(status_code=404)
