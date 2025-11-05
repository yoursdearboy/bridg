from typing import Annotated, List, Optional
from uuid import UUID

import bridg
from bridg.repository import Repository
from fastapi import APIRouter, Depends, HTTPException

from api.db import get_repository
from api.model import PerformedActivity

from . import result

router = APIRouter(prefix="/activity", tags=["performed_activity"])


class PerformedActivityRepository(Repository[bridg.PerformedActivity]):
    _sa = bridg.PerformedActivity


PerformedActivityRepositoryDep = Annotated[
    PerformedActivityRepository, Depends(get_repository(PerformedActivityRepository))
]


@router.get("")
def index(space_id: UUID, subject_id: UUID, repo: PerformedActivityRepositoryDep) -> List[PerformedActivity]:
    objs = repo.all(bridg.PerformedActivity.involved_subject_id == subject_id)
    return [PerformedActivity.model_validate(obj) for obj in objs]


@router.get("/{pa_id:uuid}")
def show(
    space_id: UUID, subject_id: UUID, pa_id: UUID, repo: PerformedActivityRepositoryDep
) -> Optional[PerformedActivity]:
    if obj := repo.one_or_none(pa_id):
        return PerformedActivity.model_validate(obj)
    raise HTTPException(status_code=404)


router.include_router(result.router, prefix="/{obs_id:uuid}")

openapi_tags = [{"name": "performed_activity"}, *result.openapi_tags]
