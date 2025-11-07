from typing import Annotated, List
from uuid import UUID

import bridg
from bridg import Repository
from fastapi import APIRouter, Depends

from api.db import get_repository
from api.model import TelecommunicationAddress, TelecommunicationAddressData

router = APIRouter(prefix="/telecommunication_addresses")


class TelecommunicationAddressRepository(Repository[bridg.common.person.TelecommunicationAddress]):
    _sa = bridg.common.person.TelecommunicationAddress


TelecommunicationAddressRepositoryDep = Annotated[
    TelecommunicationAddressRepository, Depends(get_repository(TelecommunicationAddressRepository))
]


@router.get("")
def index(person_id: UUID, repo: TelecommunicationAddressRepositoryDep) -> List[TelecommunicationAddress]:
    objs = repo.all(bridg.common.person.TelecommunicationAddress.person_id == person_id)
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
    obj = repo.one(address_id)
    data.model_update_sa(obj)
    obj = repo.update(obj)
    return TelecommunicationAddress.model_validate(obj)


@router.delete("/{address_id:uuid}")
def delete(person_id: UUID, address_id: UUID, repo: TelecommunicationAddressRepositoryDep):
    repo.delete(address_id)

