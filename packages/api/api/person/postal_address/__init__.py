from typing import List, Optional
from uuid import UUID

import bridg
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.base_model import BaseModel
from api.db import get_db
from api.extra_typing import with_id

router = APIRouter(prefix="/postal_addresses")


class PostalAddress(BaseModel[bridg.common.person.PostalAddress]):
    _sa = bridg.common.person.PostalAddress

    use: Optional[str] = None
    street: Optional[str] = None
    building: Optional[str] = None
    country: Optional[str] = None
    municipality: Optional[str] = None
    state: Optional[str] = None
    zip: Optional[str] = None


@router.get("", response_model=List[with_id(PostalAddress)])
def index(person_id: UUID, db: Session = Depends(get_db)) -> List[bridg.common.person.PostalAddress]:
    return db.query(bridg.common.person.PostalAddress).filter_by(person_id=person_id).all()


@router.post("", response_model=PostalAddress)
def create(person_id: UUID, data: PostalAddress, db: Session = Depends(get_db)):
    obj = data.model_dump_sa()
    obj.person_id = person_id

    db.add(obj)
    db.commit()

    return obj
