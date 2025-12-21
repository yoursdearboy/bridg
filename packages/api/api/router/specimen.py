from typing import Annotated, List

import bridg
from fastapi import APIRouter, Depends

from api.db import get_repository
from api.model import BaseModel, Specimen
from api.service.biospecimen import BiospecimenRepository

router = APIRouter(prefix="/specimen", tags=["specimen"])


class LookupPersondData(BaseModel[bridg.Person]):
    _sa = bridg.Person


class FoundSpecimen(BaseModel[bridg.Specimen]):
    _sa = bridg.Specimen


BiospecimenRepositoryDep = Annotated[BiospecimenRepository, Depends(
    get_repository(BiospecimenRepository))]


@router.post("/lookup")
def lookup(data: LookupPersondData, repo: BiospecimenRepositoryDep) -> List[Specimen]:
    q = data.model_dump_sa()
    objs = repo.lookup(q)
    return [Specimen.model_validate(obj) for obj in objs]


openapi_tags = [{"name": "specimen"}]
