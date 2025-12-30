from typing import Annotated, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

import bridg.alchemy
from bridg.alchemy import Repository
from bridg.api.db import get_repository
from bridg.api.model import EntityName, EntityNameData

router = APIRouter(prefix="/names")


class EntityNameRepository(Repository[bridg.alchemy.EntityName]):
    _sa = bridg.alchemy.EntityName


EntityNameRepositoryDep = Annotated[EntityNameRepository, Depends(get_repository(EntityNameRepository))]


@router.get("")
def index(person_id: UUID, repo: EntityNameRepositoryDep) -> List[EntityName]:
    objs = repo.all(bridg.alchemy.EntityName.biologic_entity_id == person_id)
    return [EntityName.model_validate(o) for o in objs]


@router.post("")
def create(person_id: UUID, data: EntityNameData, repo: EntityNameRepositoryDep) -> EntityName:
    obj = data.model_dump_sa()
    obj.biologic_entity_id = person_id
    obj = repo.create(obj)
    return EntityName.model_validate(obj)


@router.patch("/{name_id:uuid}")
def update(person_id: UUID, name_id: UUID, data: EntityNameData, repo: EntityNameRepositoryDep) -> EntityName:
    if repo.exists(name_id):
        obj = data.model_dump_sa()
        obj.id = name_id
        obj = repo.update(obj)
        return EntityName.model_validate(obj)
    raise HTTPException(status_code=404)


@router.delete("/{name_id:uuid}")
def delete(person_id: UUID, name_id: UUID, repo: EntityNameRepositoryDep):
    repo.delete(name_id)
