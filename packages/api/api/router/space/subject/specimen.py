from typing import Annotated, Iterable, List
from uuid import UUID

import bridg
from fastapi import APIRouter, Depends

from api.db import get_repository
from api.model import BaseModel, Specimen
from api.service.biospecimen import BiospecimenRepository

router = APIRouter(prefix="/specimen", tags=["specimen"])


class SpecimenRepository(bridg.Repository[bridg.Specimen]):
    _sa = bridg.Specimen

    def all(self, *args, **kwargs) -> Iterable[bridg.Specimen]:
        q = self._query().join(bridg.Specimen.producing_performed_specimen_collection)
        if args:
            q = q.filter(*args)
        if kwargs:
            q = q.filter_by(**kwargs)
        return q


class LookupPersondData(BaseModel[bridg.Person]):
    _sa = bridg.Person


class FoundSpecimen(BaseModel[bridg.Specimen]):
    _sa = bridg.Specimen


SpecimenRepositoryDep = Annotated[SpecimenRepository, Depends(
    get_repository(SpecimenRepository))]
BiospecimenRepositoryDep = Annotated[BiospecimenRepository, Depends(
    get_repository(BiospecimenRepository))]


@router.get("")
def index(space_id: UUID, subject_id: UUID, repo: SpecimenRepositoryDep) -> List[Specimen]:
    objs = repo.all(
        bridg.PerformedSpecimenCollection.involved_subject_id == subject_id)
    return [Specimen.model_validate(obj) for obj in objs]


@router.post("/lookup")
def lookup(space_id: UUID, data: LookupPersondData, repo: BiospecimenRepositoryDep) -> List[Specimen]:
    q = data.model_dump_sa()
    objs = repo.lookup(q)
    return [Specimen.model_validate(obj) for obj in objs]


openapi_tags = [{"name": "specimen"}]
