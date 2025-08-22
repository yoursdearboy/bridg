from typing import Annotated, List, Optional
from uuid import UUID

import bridg
from bridg import Repository
from fastapi import APIRouter, Depends

from api.base_model import BaseModel
from api.db import get_repository

router = APIRouter(prefix="/names")


class EntityNameData(BaseModel[bridg.EntityName]):
    _sa = bridg.EntityName

    use: Optional[str] = None
    family: Optional[str] = None
    given: Optional[str] = None
    middle: Optional[str] = None
    patronymic: Optional[str] = None
    prefix: Optional[str] = None
    suffix: Optional[str] = None


class EntityName(EntityNameData):
    id: UUID
    label: str

    @classmethod
    def model_validate(cls, obj: bridg.EntityName, **kwargs):
        data = obj.__dict__
        data["label"] = str(obj)
        return super().model_validate(data, **kwargs)


class EntityNameRepository(Repository[bridg.EntityName]):
    _sa = bridg.EntityName


EntityNameRepositoryDep = Annotated[EntityNameRepository, Depends(get_repository(EntityNameRepository))]


@router.get("")
def index(person_id: UUID, repo: EntityNameRepositoryDep) -> List[EntityName]:
    objs = repo.all(bridg.EntityName.biologic_entity_id == person_id)
    return [EntityName.model_validate(o) for o in objs]


@router.post("")
def create(person_id: UUID, data: EntityNameData, repo: EntityNameRepositoryDep) -> EntityName:
    obj = data.model_dump_sa()
    obj.biologic_entity_id = person_id
    obj = repo.create(obj)
    return EntityName.model_validate(obj)


@router.patch("/{name_id:uuid}")
def update(person_id: UUID, name_id: UUID, data: EntityNameData, repo: EntityNameRepositoryDep) -> EntityName:
    obj = repo.one(name_id)
    obj = data.model_update_sa(obj)
    obj = repo.update(obj)
    return EntityName.model_validate(obj)


@router.delete("/{name_id:uuid}")
def delete(person_id: UUID, name_id: UUID, repo: EntityNameRepositoryDep):
    repo.delete(name_id)
