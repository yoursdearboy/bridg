from typing import Annotated, List
from uuid import UUID

from fastapi import APIRouter, Depends

import bridg.alchemy
from bridg.api.db import get_repository
from bridg.api.model import PerformedSpecimenCollection

router = APIRouter(prefix="/specimen_collection")


class PerformedSpecimenCollectionRepository(bridg.alchemy.Repository[bridg.alchemy.PerformedSpecimenCollection]):
    _sa = bridg.alchemy.PerformedSpecimenCollection


PerformedSpecimenCollectionRepositoryDep = Annotated[
    PerformedSpecimenCollectionRepository, Depends(get_repository(PerformedSpecimenCollectionRepository))
]


@router.get("", operation_id="list_subject_performed_specimen_collection")
def index(subject_id: UUID, repo: PerformedSpecimenCollectionRepositoryDep) -> List[PerformedSpecimenCollection]:
    objs = repo.all(bridg.alchemy.PerformedSpecimenCollection.involved_subject_id == subject_id)
    return [PerformedSpecimenCollection.model_validate(obj) for obj in objs]
