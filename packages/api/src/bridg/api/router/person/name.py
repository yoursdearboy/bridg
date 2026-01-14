from typing import Annotated, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

import bridg.alchemy
from bridg.alchemy import Repository
from bridg.api.db import get_repository
from bridg.api.model import BiologicEntityName, BiologicEntityNameData

router = APIRouter(prefix="/name")


class BiologicEntityNameRepository(Repository[bridg.alchemy.BiologicEntityName]):
    _sa = bridg.alchemy.BiologicEntityName


BiologicEntityNameRepositoryDep = Annotated[
    BiologicEntityNameRepository, Depends(get_repository(BiologicEntityNameRepository))
]


@router.get("")
def index(person_id: UUID, repo: BiologicEntityNameRepositoryDep) -> List[BiologicEntityName]:
    objs = repo.all(bridg.alchemy.BiologicEntityName.biologic_entity_id == person_id)
    return [BiologicEntityName.model_validate(o) for o in objs]


@router.post("")
def create(person_id: UUID, data: BiologicEntityNameData, repo: BiologicEntityNameRepositoryDep) -> BiologicEntityName:
    obj = data.model_dump_sa()
    obj.biologic_entity_id = person_id
    obj = repo.create(obj)
    return BiologicEntityName.model_validate(obj)


@router.patch("/{name_id:uuid}")
def update(
    person_id: UUID, name_id: UUID, data: BiologicEntityNameData, repo: BiologicEntityNameRepositoryDep
) -> BiologicEntityName:
    if repo.exists(name_id):
        obj = data.model_dump_sa()
        obj.id = name_id
        obj = repo.update(obj)
        return BiologicEntityName.model_validate(obj)
    raise HTTPException(status_code=404)


@router.delete("/{name_id:uuid}")
def delete(person_id: UUID, name_id: UUID, repo: BiologicEntityNameRepositoryDep):
    repo.delete(name_id)
