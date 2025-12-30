from typing import Annotated, Any, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

import bridg.alchemy
from bridg.api.context import Context, get_context
from bridg.api.db import get_repository
from bridg.api.model import (
    PerformedActivity,
    PerformedActivityData,
    PerformedObservation,
    PerformedObservationData,
    PerformedSpecimenCollection,
    PerformedSpecimenCollectionData,
)

router = APIRouter(prefix="/activity", tags=["performed_activity"])


class PerformedActivityRepository(bridg.alchemy.Repository[bridg.alchemy.PerformedActivity]):
    _sa = bridg.alchemy.PerformedActivity


PerformedActivityRepositoryDep = Annotated[
    PerformedActivityRepository, Depends(get_repository(PerformedActivityRepository))
]


RESPONSES: dict[int | str, dict[str, Any]] = {
    "200": {
        "description": "Successful Response",
        "content": {
            "application/json": {
                "schema": {
                    "anyOf": None,
                    "oneOf": [
                        {"$ref": "#/components/schemas/PerformedActivity"},
                        {"$ref": "#/components/schemas/PerformedObservation"},
                        {"$ref": "#/components/schemas/PerformedSpecimenCollection"},
                        {"type": "null"},
                    ],
                    "title": "PerformedActivityUnion",
                }
            }
        },
    }
}

OPENAPI_EXTRA = {
    "requestBody": {
        "required": True,
        "content": {
            "application/json": {
                "schema": {
                    "anyOf": None,
                    "oneOf": [
                        {"$ref": "#/components/schemas/PerformedObservationData"},
                        {"$ref": "#/components/schemas/PerformedActivityData"},
                        {"$ref": "#/components/schemas/PerformedSpecimenCollectionData"},
                    ],
                    "title": "PerformedActivityUnionData",
                }
            }
        },
    }
}


@router.get("")
def index(space_id: UUID, subject_id: UUID, repo: PerformedActivityRepositoryDep) -> List[PerformedActivity]:
    objs = repo.all(bridg.alchemy.PerformedActivity.involved_subject_id == subject_id)
    return [PerformedActivity.model_validate(obj) for obj in objs]


@router.get("/{a_id:uuid}", responses=RESPONSES)
def show(
    space_id: UUID,
    subject_id: UUID,
    a_id: UUID,
    repo: PerformedActivityRepositoryDep,
    result: bool = False,
) -> PerformedActivity | PerformedObservation | PerformedSpecimenCollection:
    if obj := repo.one_or_none(a_id):
        if result:
            match obj:
                case bridg.alchemy.PerformedSpecimenCollection():
                    return PerformedSpecimenCollection.model_validate(obj)
                case bridg.alchemy.PerformedObservation():
                    return PerformedObservation.model_validate(obj)
        return PerformedActivity.model_validate(obj)
    raise HTTPException(status_code=404)


@router.post("", responses=RESPONSES, openapi_extra=OPENAPI_EXTRA)
def create(
    space_id: UUID,
    subject_id: UUID,
    data: PerformedObservationData | PerformedActivityData | PerformedSpecimenCollectionData,
    repo: PerformedActivityRepositoryDep,
    context: Annotated[Context, Depends(get_context)],
) -> PerformedActivity | PerformedObservation | PerformedSpecimenCollection:
    obj = data.model_dump_sa(context=context)
    obj.involved_subject_id = subject_id
    obj = repo.create(obj)
    match data:
        case PerformedActivityData():
            return PerformedActivity.model_validate(obj)
        case PerformedObservationData():
            return PerformedObservation.model_validate(obj)
        case PerformedSpecimenCollectionData():
            return PerformedSpecimenCollection.model_validate(obj)


@router.patch("/{a_id:uuid}", responses=RESPONSES, openapi_extra=OPENAPI_EXTRA)
def update(
    space_id: UUID,
    subject_id: UUID,
    a_id: UUID,
    data: PerformedObservationData | PerformedActivityData | PerformedSpecimenCollectionData,
    repo: PerformedActivityRepositoryDep,
    context: Annotated[Context, Depends(get_context)],
) -> PerformedActivity | PerformedObservation | PerformedSpecimenCollection:
    if repo.exists(a_id):
        obj = data.model_dump_sa(context=context)
        obj.id = a_id
        obj = repo.update(obj)
        match data:
            case PerformedActivityData():
                return PerformedActivity.model_validate(obj)
            case PerformedObservationData():
                return PerformedObservation.model_validate(obj)
            case PerformedSpecimenCollectionData():
                return PerformedSpecimenCollection.model_validate(obj)
    raise HTTPException(status_code=404)


openapi_tags = [{"name": "performed_activity"}]
