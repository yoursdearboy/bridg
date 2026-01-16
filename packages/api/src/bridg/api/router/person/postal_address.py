from typing import Annotated, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

import bridg.alchemy
from bridg.alchemy import Repository
from bridg.api.db import get_repository
from bridg.api.model import PersonPostalAddress, PersonPostalAddressData

router = APIRouter(prefix="/postal_address")


class PersonPostalAddressRepository(Repository[bridg.alchemy.PersonPostalAddress]):
    _sa = bridg.alchemy.common.person.PersonPostalAddress


PersonPostalAddressRepositoryDep = Annotated[
    PersonPostalAddressRepository, Depends(get_repository(PersonPostalAddressRepository))
]


@router.get("", operation_id="list_person_postal_address")
def index(person_id: UUID, repo: PersonPostalAddressRepositoryDep) -> List[PersonPostalAddress]:
    objs = repo.all(bridg.alchemy.common.person.PersonPostalAddress.person_id == person_id)
    return [PersonPostalAddress.model_validate(o) for o in objs]


@router.post("", operation_id="create_person_postal_address")
def create(
    person_id: UUID, data: PersonPostalAddressData, repo: PersonPostalAddressRepositoryDep
) -> PersonPostalAddress:
    obj = data.model_dump_sa()
    obj.person_id = person_id
    obj = repo.create(obj)
    return PersonPostalAddress.model_validate(obj)


@router.patch("/{address_id:uuid}", operation_id="update_person_postal_address")
def update(
    person_id: UUID, address_id: UUID, data: PersonPostalAddressData, repo: PersonPostalAddressRepositoryDep
) -> PersonPostalAddress:
    if repo.exists(address_id):
        obj = data.model_dump_sa()
        obj.id = address_id
        obj = repo.update(obj)
        return PersonPostalAddress.model_validate(obj)
    raise HTTPException(status_code=404)


@router.delete("/{address_id:uuid}", operation_id="delete_person_postal_address")
def delete(person_id: UUID, address_id: UUID, repo: PersonPostalAddressRepositoryDep):
    repo.delete(address_id)
