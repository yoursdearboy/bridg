from typing import Annotated, List
from uuid import UUID

import bridg
from bridg import Repository
from fastapi import APIRouter, Depends

from api.db import get_repository
from api.model import PostalAddress, PostalAddressData

router = APIRouter(prefix="/postal_addresses")


class PostalAddressRepository(Repository[bridg.PostalAddress]):
    _sa = bridg.common.person.PostalAddress


PostalAddressRepository = Annotated[PostalAddressRepository, Depends(
    get_repository(PostalAddressRepository))]


@router.get("")
def index(person_id: UUID, repo: PostalAddressRepository) -> List[PostalAddress]:
    objs = repo.all(bridg.common.person.PostalAddress.person_id == person_id)
    return [PostalAddress.model_validate(o) for o in objs]


@router.post("")
def create(person_id: UUID, data: PostalAddressData, repo: PostalAddressRepository) -> PostalAddress:
    obj = data.model_dump_sa()
    obj.person_id = person_id
    obj = repo.create(obj)
    return PostalAddress.model_validate(obj)


@router.patch("/{address_id:uuid}")
def update(person_id: UUID, address_id: UUID, data: PostalAddressData, repo: PostalAddressRepository) -> PostalAddress:
    obj = repo.one(address_id)
    data.model_update_sa(obj)
    obj = repo.update(obj)
    return PostalAddress.model_validate(obj)


@router.delete("/{address_id:uuid}")
def delete(person_id: UUID, address_id: UUID, repo: PostalAddressRepository):
    repo.delete(address_id)
