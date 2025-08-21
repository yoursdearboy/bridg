from typing import List, Optional
from uuid import UUID

import bridg
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.base_model import BaseModel
from api.db import get_db
from api.extra_typing import with_id

router = APIRouter(prefix="/telecommunication_addresses")


class TelecommunicationAddress(BaseModel[bridg.common.person.TelecommunicationAddress]):
    _sa = bridg.common.person.TelecommunicationAddress

    use: Optional[str] = None
    scheme: Optional[str] = None
    address: Optional[str] = None

@router.get("", response_model=List[with_id(TelecommunicationAddress)])
def index(person_id: UUID, db: Session = Depends(get_db)) -> List[bridg.common.person.TelecommunicationAddress]:
    return db.query(bridg.common.person.TelecommunicationAddress).filter_by(person_id=person_id).all()


@router.post("", response_model=TelecommunicationAddress)
def create(person_id: UUID, data: TelecommunicationAddress, db: Session = Depends(get_db)):
    obj = data.model_dump_sa()
    obj.person_id = person_id

    db.add(obj)
    db.commit()

    return obj
