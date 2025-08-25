from datetime import datetime
from typing import Annotated, List, Optional
from uuid import UUID

import bridg
from bridg.repository import Repository
from fastapi import APIRouter, Depends

from api.base_model import BaseModel, Code
from api.db import get_repository


class PerformedObservationResult(BaseModel):
    id: UUID
    type_code: Optional[Code]
    value: Optional[str]
    value_null_flavor_reason: Optional[str]
    baseline_indicator: Optional[bool]
    derived_indicator: Optional[bool]
    created_date: Optional[datetime]
    reported_date: Optional[datetime]
    comment: Optional[str]


router = APIRouter(prefix="/result", tags=["observation_result"])


class PerformedObservationResultRepository(Repository[bridg.PerformedObservationResult]):
    _sa = bridg.PerformedObservationResult


ObservationRepositoryDep = Annotated[
    PerformedObservationResultRepository, Depends(get_repository(PerformedObservationResultRepository))
]


@router.get("")
def index(
    space_id: UUID, subject_id: UUID, obs_id: UUID, repo: ObservationRepositoryDep
) -> List[PerformedObservationResult]:
    objs = repo.all(bridg.PerformedObservationResult.producing_performed_observation_id == obs_id)
    return [PerformedObservationResult.model_validate(obj) for obj in objs]


openapi_tags = [{"name": "observation_result"}]
