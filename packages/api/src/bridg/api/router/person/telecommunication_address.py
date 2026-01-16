from typing import Annotated, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

import bridg.alchemy
from bridg.alchemy import Repository
from bridg.api.db import get_repository
from bridg.api.model import PersonTelecommunicationAddress, PersonTelecommunicationAddressData

router = APIRouter(prefix="/telecommunication_address")


class PersonTelecommunicationAddressRepository(Repository[bridg.alchemy.common.person.PersonTelecommunicationAddress]):
    _sa = bridg.alchemy.common.person.PersonTelecommunicationAddress


PersonTelecommunicationAddressRepositoryDep = Annotated[
    PersonTelecommunicationAddressRepository, Depends(get_repository(PersonTelecommunicationAddressRepository))
]


@router.get("", operation_id="list_person_telecom_address")
def index(person_id: UUID, repo: PersonTelecommunicationAddressRepositoryDep) -> List[PersonTelecommunicationAddress]:
    objs = repo.all(bridg.alchemy.common.person.PersonTelecommunicationAddress.person_id == person_id)
    return [PersonTelecommunicationAddress.model_validate(o) for o in objs]


@router.post("", operation_id="create_person_telecom_address")
def create(
    person_id: UUID, data: PersonTelecommunicationAddressData, repo: PersonTelecommunicationAddressRepositoryDep
) -> PersonTelecommunicationAddress:
    obj = data.model_dump_sa()
    obj.person_id = person_id
    obj = repo.create(obj)
    return PersonTelecommunicationAddress.model_validate(obj)


@router.patch("/{address_id:uuid}", operation_id="update_person_telecom_address")
def update(
    person_id: UUID,
    address_id: UUID,
    data: PersonTelecommunicationAddressData,
    repo: PersonTelecommunicationAddressRepositoryDep,
) -> PersonTelecommunicationAddress:
    if repo.exists(address_id):
        obj = data.model_dump_sa()
        obj.id = address_id
        obj = repo.update(obj)
        return PersonTelecommunicationAddress.model_validate(obj)
    raise HTTPException(status_code=404)


@router.delete("/{address_id:uuid}", operation_id="delete_person_telecom_address")
def delete(person_id: UUID, address_id: UUID, repo: PersonTelecommunicationAddressRepositoryDep):
    repo.delete(address_id)
