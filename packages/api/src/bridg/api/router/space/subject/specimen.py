from typing import Annotated, Iterable, List
from uuid import UUID

from fastapi import APIRouter, Depends

import bridg.alchemy
from bridg.api.db import get_repository
from bridg.api.model import Specimen

router = APIRouter(prefix="/specimen", tags=["specimen"])


class SpecimenRepository(bridg.alchemy.Repository[bridg.alchemy.Specimen]):
    _sa = bridg.alchemy.Specimen

    def all(self, *args, **kwargs) -> Iterable[bridg.alchemy.Specimen]:
        q = self._query().join(bridg.alchemy.Specimen.producing_performed_specimen_collection)
        if args:
            q = q.filter(*args)
        if kwargs:
            q = q.filter_by(**kwargs)
        return q


SpecimenRepositoryDep = Annotated[SpecimenRepository, Depends(get_repository(SpecimenRepository))]


@router.get("")
def index(space_id: UUID, subject_id: UUID, repo: SpecimenRepositoryDep) -> List[Specimen]:
    objs = repo.all(bridg.alchemy.PerformedSpecimenCollection.involved_subject_id == subject_id)
    return [Specimen.model_validate(obj) for obj in objs]


openapi_tags = [{"name": "specimen"}]
