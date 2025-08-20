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


@router.get("", response_model=List[EntityName])
def index(person_id: UUID, db: Session = Depends(get_db)) -> List[bridg.EntityName]:
    return db.query(bridg.EntityName).filter_by(biologic_entity_id=person_id).all()


@router.post("", response_model=EntityName)
def create(person_id: UUID, data: EntityNameData, db: Session = Depends(get_db)):
    obj = data.model_dump_sa()
    obj.biologic_entity_id = person_id

    db.add(obj)
    db.commit()

    return obj
