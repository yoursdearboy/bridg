from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import bridg
from api.base_model import BaseModel
from api.db import get_db

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


@router.get("")
def index(person_id: UUID, db: Session = Depends(get_db)) -> List[EntityName]:
    objs = db.query(bridg.EntityName).filter_by(biologic_entity_id=person_id)
    res = [EntityName.model_validate(o) for o in objs]
    return res


@router.post("")
def create(person_id: UUID, data: EntityNameData, db: Session = Depends(get_db)) -> EntityName:
    obj = data.model_dump_sa()
    obj.biologic_entity_id = person_id

    db.add(obj)
    db.commit()

    return EntityName.model_validate(obj)


@router.delete("/{name_id:uuid}")
def delete(person_id: UUID, name_id: UUID, db: Session = Depends(get_db)):
    db.query(bridg.EntityName).filter_by(id=name_id).delete()
    db.commit()
