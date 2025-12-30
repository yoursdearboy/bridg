from typing import Annotated, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

import bridg.alchemy
from bridg.alchemy import Repository
from bridg.api.db import get_repository
from bridg.api.model import PostalAddress, PostalAddressData

router = APIRouter(prefix="/postal_addresses")


class PostalAddressRepository(Repository[bridg.alchemy.common.person.PostalAddress]):
    _sa = bridg.alchemy.common.person.PostalAddress


PostalAddressRepositoryDep = Annotated[PostalAddressRepository, Depends(get_repository(PostalAddressRepository))]


@router.get("")
def index(person_id: UUID, repo: PostalAddressRepositoryDep) -> List[PostalAddress]:
    objs = repo.all(bridg.alchemy.common.person.PostalAddress.person_id == person_id)
    return [PostalAddress.model_validate(o) for o in objs]


@router.post("")
def create(person_id: UUID, data: PostalAddressData, repo: PostalAddressRepositoryDep) -> PostalAddress:
    obj = data.model_dump_sa()
    obj.person_id = person_id
    obj = repo.create(obj)
    return PostalAddress.model_validate(obj)


@router.patch("/{address_id:uuid}")
def update(
    person_id: UUID, address_id: UUID, data: PostalAddressData, repo: PostalAddressRepositoryDep
) -> PostalAddress:
    if repo.exists(address_id):
        obj = data.model_dump_sa()
        obj.id = address_id
        obj = repo.update(obj)
        return PostalAddress.model_validate(obj)
    raise HTTPException(status_code=404)


@router.delete("/{address_id:uuid}")
def delete(person_id: UUID, address_id: UUID, repo: PostalAddressRepositoryDep):
    repo.delete(address_id)
