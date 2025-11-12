from datetime import datetime
from typing import Annotated, List, Optional
from uuid import UUID

import bridg
from bridg.repository import Repository
from fastapi import APIRouter, Depends, HTTPException

from api.context import Context, get_context
from api.db import get_repository
from api.model import BaseModel, ConceptDescriptor, PerformedActivity, PerformedObservation, PerformedObservationResult

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


class PerformedActivityAttributes:
    reason_code: Optional[ConceptDescriptor]
    status_code: Optional[ConceptDescriptor]
    status_date: Optional[datetime]
    context_for_study_site_id: Optional[UUID]
    containing_epoch_id: Optional[UUID]
    instantiated_defined_activity_id: Optional[UUID]


class PerformedActivityData(PerformedActivityAttributes, BaseModel[bridg.PerformedActivity]):
    _sa = bridg.PerformedActivity


class PerformedObservationData(PerformedActivityAttributes, BaseModel[bridg.PerformedObservation]):
    _sa = bridg.PerformedObservation

    resulted_performed_observation_result: List[PerformedObservationResult]


@router.post("")
def create(
    space_id: UUID,
    subject_id: UUID,
    data: PerformedActivityData | PerformedObservationData,
    repo: PerformedActivityRepositoryDep,
    context: Annotated[Context, Depends(get_context)],
) -> str:
    obj = data.model_dump_sa(context=context)
    obj.involved_subject_id = subject_id
    obj = repo.create(obj)
    return str(obj.id)


@router.patch("/{a_id:uuid}")
def update(
    space_id: UUID,
    subject_id: UUID,
    a_id: UUID,
    data: PerformedActivityData | PerformedObservationData,
    repo: PerformedActivityRepositoryDep,
    context: Annotated[Context, Depends(get_context)],
) -> None:
    if obj := repo.one_or_none(a_id):
        obj = data.model_update_sa(obj, exclude={"resulted_performed_observation_result"}, context=context)  # type: ignore
        obj.resulted_performed_observation_result = []
        for r in data.resulted_performed_observation_result:
            obj.resulted_performed_observation_result.append(r.model_dump_sa(context=context))
        obj = repo.update(obj)
        return
    raise HTTPException(status_code=404)


openapi_tags = [{"name": "performed_activity"}]
