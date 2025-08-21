from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends
from pydantic import model_validator
from sqlalchemy.orm import Session

import bridg
from api import site, subject
from api.base_model import BaseModel
from api.db import get_db

router = APIRouter(prefix="/spaces")


class StudyProtocolVersion(BaseModel):
    id: UUID
    name: str

    @model_validator(mode="before")
    @classmethod
    def convert_name(cls, obj):
        if isinstance(obj, bridg.StudyProtocolVersion):
            data = obj.__dict__
            data["name"] = str(obj)
        return obj


@router.get("", response_model=List[StudyProtocolVersion])
def index(db: Session = Depends(get_db)):
    return db.query(bridg.StudyProtocolVersion).all()


space_router = APIRouter(prefix="/{space_id:uuid}")
space_router.include_router(subject.router)
space_router.include_router(site.router)

router.include_router(space_router)

openapi_tags = [*subject.openapi_tag]
