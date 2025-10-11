from typing import Annotated, List, Optional
from uuid import UUID

import bridg
from bridg.repository import Repository
from fastapi import APIRouter, Depends, HTTPException

from api.base_model import BaseModel, Code
from api.db import get_repository

from . import result

router = APIRouter(prefix="/activity", tags=["space_activity"])


class StudyActivity(BaseModel):
    class DefinedActivity(BaseModel):
        id: UUID
        name_code: Code
        category_code: Optional[Code]
        subcategory_code: Optional[Code]
        description: Optional[str]

    id: UUID
    used_defined_activity: DefinedActivity


class StudyActivityRepository(Repository[bridg.StudyActivity]):
    _sa = bridg.StudyActivity


StudyActivityRepositoryDep = Annotated[StudyActivityRepository, Depends(get_repository(StudyActivityRepository))]


@router.get("")
def index(space_id: UUID, repo: StudyActivityRepositoryDep) -> List[StudyActivity]:
    objs = repo.all(bridg.StudyActivity.using_study_protocol_version_id == space_id)
    return [StudyActivity.model_validate(obj) for obj in objs]



@router.get("/{obs_id:uuid}")
def show(space_id: UUID, obs_id: UUID, repo: StudyActivityRepositoryDep) -> Optional[StudyActivity]:
    if obj := repo.one_or_none(obs_id):
        return StudyActivity.model_validate(obj)
    raise HTTPException(status_code=404)


router.include_router(result.router, prefix="/{obs_id:uuid}")

openapi_tags = [{"name": "space_activity"}, *result.openapi_tags]
