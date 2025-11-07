from typing import Annotated, List, Optional
from uuid import UUID

import bridg
from bridg.repository import Repository
from fastapi import APIRouter, Depends, HTTPException

from api.db import get_repository
from api.model import PerformedActivity, PerformedObservation

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


@router.get(
    "/{a_id:uuid}",
    responses={
        "200": {
            "description": "Successful Response",
            "content": {
                "application/json": {
                    "schema": {
                        "anyOf": None,
                        "oneOf": [
                            {"$ref": "#/components/schemas/PerformedActivity"},
                            {"$ref": "#/components/schemas/PerformedObservation"},
                            {"type": "null"},
                        ],
                        "title": "Response Show Performed Activity  A Id  Get",
                    }
                }
            },
        }
    },
)
def show(
    space_id: UUID,
    subject_id: UUID,
    a_id: UUID,
    repo: PerformedActivityRepositoryDep,
    result: bool = False,
) -> Optional[PerformedActivity | PerformedObservation]:
    if obj := repo.one_or_none(a_id):
        if result:
            return PerformedObservation.model_validate(obj)
        return PerformedActivity.model_validate(obj)
    raise HTTPException(status_code=404)


openapi_tags = [{"name": "performed_activity"}]
