from datetime import date
from typing import Optional
from uuid import UUID

import bridg
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.base_model import BaseModel
from api.db import get_db
from api.model import EntityName

from . import name, postal_address, telecommunication_address

router = APIRouter(prefix="/persons", tags=["persons"])


class Person(BaseModel):
    id: UUID
    administrative_gender_code: Optional[bridg.AdministrativeGender]
    birth_date: Optional[date]
    death_date: Optional[date]
    death_date_estimated_indicator: Optional[bool]
    death_indicator: Optional[bool]
    primary_name: Optional[EntityName]


@router.get("/{person_id:uuid}", response_model=Person)
def show(person_id: UUID, db: Session = Depends(get_db)) -> Optional[bridg.Person]:
    return db.query(bridg.Person).filter_by(id=person_id).one_or_none()


router.include_router(name.router, prefix="/{person_id:uuid}")
router.include_router(postal_address.router, prefix="/{person_id:uuid}")
router.include_router(telecommunication_address.router, prefix="/{person_id:uuid}")

openapi_tags = [{"name": "persons", "postal_address": "persons", "telecommunication_address": "persons"}]
