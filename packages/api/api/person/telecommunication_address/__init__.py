from typing import Annotated, List, Optional
from uuid import UUID

import bridg
from bridg import Repository
from fastapi import APIRouter, Depends

from api.base_model import BaseModel
from api.db import get_repository

router = APIRouter(prefix="/telecommunication_addresses")


class TelecommunicationAddress(BaseModel[bridg.common.person.TelecommunicationAddress]):
    _sa = bridg.common.person.TelecommunicationAddress

    use: Optional[str] = None
    scheme: Optional[str] = None
    address: Optional[str] = None


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
    person_id: UUID, data: TelecommunicationAddress, repo: TelecommunicationAddressRepositoryDep
) -> TelecommunicationAddress:
    obj = data.model_dump_sa()
    obj.person_id = person_id
    obj = repo.create(obj)
    return TelecommunicationAddress.model_validate(obj)


@router.patch("/{address_id:uuid}")
def update(
    person_id: UUID, address_id: UUID, data: TelecommunicationAddress, repo: TelecommunicationAddressRepositoryDep
) -> TelecommunicationAddress:
    obj = repo.one(address_id)
    data.model_update_sa(obj)
    obj = repo.update(obj)
    return TelecommunicationAddress.model_validate(obj)


@router.delete("/{address_id:uuid}")
def delete(person_id: UUID, address_id: UUID, repo: TelecommunicationAddressRepositoryDep):
    repo.delete(address_id)
