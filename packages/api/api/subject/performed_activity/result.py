from typing import Annotated, List
from uuid import UUID

import bridg
from bridg.repository import Repository
from fastapi import APIRouter, Depends

from api.db import get_repository
from api.model import PerformedObservationResult

router = APIRouter(prefix="/result", tags=["performed_observation_result"])


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


openapi_tags = [{"name": "performed_observation_result"}]
