from typing import Annotated, List, Optional
from uuid import UUID

import bridg
from bridg.repository import Repository
from fastapi import APIRouter, Depends

from api.base_model import BaseModel, Code
from api.db import get_repository


class DefinedObservationResult(BaseModel):
    id: UUID
    value: Optional[str]
    value_negation_indicator: Optional[bool]
    type_code: Optional[Code]
    derivation_expression: Optional[str]


router = APIRouter(prefix="/result", tags=["defined_observation_result"])


class DefinedObservationResultRepository(Repository[bridg.DefinedObservationResult]):
    _sa = bridg.DefinedObservationResult

    def _query(self):
        q = super()._query()
        q = q.join(bridg.DefinedObservationResult.producing_defined_observation)
        q = q.join(bridg.DefinedObservation.using_study_activity)
        return q


ObservationRepositoryDep = Annotated[
    DefinedObservationResultRepository, Depends(get_repository(DefinedObservationResultRepository))
]


@router.get("")
def index(space_id: UUID, obs_id: UUID, repo: ObservationRepositoryDep) -> List[DefinedObservationResult]:
    objs = repo.all(bridg.StudyActivity.id == obs_id)
    return [DefinedObservationResult.model_validate(obj) for obj in objs]


openapi_tags = [{"name": "defined_observation_result"}]
