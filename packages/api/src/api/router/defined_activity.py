from typing import Annotated
from uuid import UUID

import bridg
from bridg.repository import Repository
from fastapi import APIRouter, Depends, HTTPException

from api.db import get_repository
from api.model import DefinedActivity, DefinedObservation

router = APIRouter(prefix="/defined_activity", tags=["defined_activity"])


class DefinedActivityRepository(Repository[bridg.DefinedActivity]):
    _sa = bridg.DefinedActivity


DefinedActivityRepositoryDep = Annotated[DefinedActivityRepository, Depends(get_repository(DefinedActivityRepository))]


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
                            {"$ref": "#/components/schemas/DefinedActivity"},
                            {"$ref": "#/components/schemas/DefinedObservation"},
                            {"type": "null"},
                        ],
                        "title": "DefinedActivityUnion",
                    }
                }
            },
        }
    },
)
def show(
    a_id: UUID,
    repo: DefinedActivityRepositoryDep,
    result: bool = False,
) -> DefinedActivity | DefinedObservation:
    if obj := repo.one_or_none(a_id):
        if result:
            return DefinedObservation.model_validate(obj)
        return DefinedActivity.model_validate(obj)
    raise HTTPException(status_code=404)


openapi_tags = [{"name": "defined_activity"}]
