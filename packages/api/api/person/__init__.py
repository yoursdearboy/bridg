from datetime import date
from typing import Annotated, Optional
from uuid import UUID

import bridg
from bridg import Repository
from fastapi import APIRouter, Depends, HTTPException

from api.base_model import BaseModel
from api.db import get_repository
from api.model import EntityName

from . import name, postal_address, telecommunication_address

router = APIRouter(prefix="/persons", tags=["persons"])


class Person(BaseModel[bridg.Person]):
    id: UUID
    administrative_gender_code: Optional[bridg.AdministrativeGender]
    birth_date: Optional[date]
    death_date: Optional[date]
    death_date_estimated_indicator: Optional[bool]
    death_indicator: Optional[bool]
    primary_name: Optional[EntityName]


class PersonRepository(Repository[bridg.Person]):
    _sa = bridg.Person


PersonRepositoryDep = Annotated[PersonRepository, Depends(get_repository(PersonRepository))]


@router.get("/{person_id:uuid}")
def show(person_id: UUID, repo: PersonRepositoryDep) -> Optional[Person]:
    if obj := repo.one_or_none(person_id):
        return Person.model_validate(obj)
    raise HTTPException(status_code=404)


router.include_router(name.router, prefix="/{person_id:uuid}")
router.include_router(postal_address.router, prefix="/{person_id:uuid}")
router.include_router(telecommunication_address.router, prefix="/{person_id:uuid}")

openapi_tags = [{"name": "persons", "postal_address": "persons", "telecommunication_address": "persons"}]
