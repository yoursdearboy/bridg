from typing import Annotated, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

import bridg.alchemy
from bridg.alchemy import Repository
from bridg.api.db import get_repository
from bridg.api.model import TelecommunicationAddress, TelecommunicationAddressData

router = APIRouter(prefix="/telecommunication_addresses")


class TelecommunicationAddressRepository(Repository[bridg.alchemy.common.person.TelecommunicationAddress]):
    _sa = bridg.alchemy.common.person.TelecommunicationAddress


TelecommunicationAddressRepositoryDep = Annotated[
    TelecommunicationAddressRepository, Depends(get_repository(TelecommunicationAddressRepository))
]


@router.get("")
def index(person_id: UUID, repo: TelecommunicationAddressRepositoryDep) -> List[TelecommunicationAddress]:
    objs = repo.all(bridg.alchemy.common.person.TelecommunicationAddress.person_id == person_id)
    return [TelecommunicationAddress.model_validate(o) for o in objs]


@router.post("")
def create(
    person_id: UUID, data: TelecommunicationAddressData, repo: TelecommunicationAddressRepositoryDep
) -> TelecommunicationAddress:
    obj = data.model_dump_sa()
    obj.person_id = person_id
    obj = repo.create(obj)
    return TelecommunicationAddress.model_validate(obj)


@router.patch("/{address_id:uuid}")
def update(
    person_id: UUID, address_id: UUID, data: TelecommunicationAddressData, repo: TelecommunicationAddressRepositoryDep
) -> TelecommunicationAddress:
    if repo.exists(address_id):
        obj = data.model_dump_sa()
        obj.id = address_id
        obj = repo.update(obj)
        return TelecommunicationAddress.model_validate(obj)
    raise HTTPException(status_code=404)


@router.delete("/{address_id:uuid}")
def delete(person_id: UUID, address_id: UUID, repo: TelecommunicationAddressRepositoryDep):
    repo.delete(address_id)
