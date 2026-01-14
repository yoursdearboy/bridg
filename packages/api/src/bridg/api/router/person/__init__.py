from typing import Annotated, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

import bridg.alchemy
from bridg.alchemy import Repository
from bridg.api.db import get_repository
from bridg.api.model import Person, PersonPatch

from . import name, postal_address, subject, telecommunication_address

router = APIRouter(prefix="/person")


class PersonRepository(Repository[bridg.alchemy.Person]):
    _sa = bridg.alchemy.Person


PersonRepositoryDep = Annotated[PersonRepository, Depends(get_repository(PersonRepository))]


@router.get("/{person_id:uuid}")
def show(person_id: UUID, repo: PersonRepositoryDep) -> Optional[Person]:
    if obj := repo.one_or_none(person_id):
        return Person.model_validate(obj)
    raise HTTPException(status_code=404)


@router.patch("/{person_id:uuid}")
def update(person_id: UUID, data: PersonPatch, repo: PersonRepositoryDep) -> Person:
    if repo.exists(person_id):
        obj = data.model_dump_sa()
        obj.id = person_id
        obj = repo.update(obj)
        return Person.model_validate(obj)
    raise HTTPException(status_code=404)


router.include_router(name.router, prefix="/{person_id:uuid}")
router.include_router(postal_address.router, prefix="/{person_id:uuid}")
router.include_router(telecommunication_address.router, prefix="/{person_id:uuid}")
router.include_router(subject.router, prefix="/{person_id:uuid}")
