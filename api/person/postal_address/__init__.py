from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import bridg
from api.base_model import BaseModel
from api.db import get_db
from api.extra_typing import with_id

router = APIRouter(prefix="/postal_addresses")


class PostalAddressData(BaseModel[bridg.common.person.PostalAddress]):
    _sa = bridg.common.person.PostalAddress

    use: Optional[str] = None
    street: Optional[str] = None
    building: Optional[str] = None
    country: Optional[str] = None
    municipality: Optional[str] = None
    state: Optional[str] = None
    zip: Optional[str] = None


class PostalAddress(PostalAddressData):
    id: UUID
    label: str

    @classmethod
    def model_validate(cls, obj: bridg.common.person.PostalAddress, **kwargs):
        data = obj.__dict__
        data["label"] = str(obj)
        return super().model_validate(data, **kwargs)


@router.get("", response_model=List[with_id(PostalAddress)])
def index(person_id: UUID, db: Session = Depends(get_db)) -> List[bridg.common.person.PostalAddress]:
    objs = db.query(bridg.common.person.PostalAddress).filter_by(person_id=person_id).all()
    res = [PostalAddress.model_validate(o) for o in objs]
    return res


@router.post("", response_model=PostalAddress)
def create(person_id: UUID, data: PostalAddress, db: Session = Depends(get_db)) -> PostalAddress:
    obj = data.model_dump_sa()
    obj.person_id = person_id

    db.add(obj)
    db.commit()

    return PostalAddress.model_validate(obj)


@router.patch("/{name_id:uuid}")
def update(person_id: UUID, address_id: UUID, data: PostalAddress, db: Session = Depends(get_db)) -> PostalAddress:
    obj = db.query(bridg.common.person.PostalAddress).filter_by(id=address_id).one()

    data.model_update_sa(obj)

    db.add(obj)
    db.commit()

    return PostalAddress.model_validate(obj)


@router.delete("/{address_id:uuid}")
def delete(person_id: UUID, address_id: UUID, db: Session = Depends(get_db)):
    db.query(bridg.common.person.PostalAddress).filter_by(id=address_id).delete()
    db.commit()
