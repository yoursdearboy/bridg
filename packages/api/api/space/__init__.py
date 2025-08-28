from typing import Annotated, List
from uuid import UUID

import bridg
from bridg import Repository
from fastapi import APIRouter, Depends
from pydantic import model_validator

from api import site, subject
from api.base_model import BaseModel
from api.db import get_repository

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


class StudyProtocolVersionRepository(Repository[bridg.protocol.StudyProtocolVersion]):
    _sa = bridg.StudyProtocolVersion


StudyProtocolVersionRepository = Annotated[StudyProtocolVersionRepository,
                                           Depends(get_repository(StudyProtocolVersionRepository))]


@router.get("")
def index(repo: StudyProtocolVersionRepository) -> List[StudyProtocolVersion]:
    objs = repo.all()
    return [StudyProtocolVersion.model_validate(o) for o in objs]


space_router = APIRouter(prefix="/{space_id:uuid}")
space_router.include_router(subject.router)
space_router.include_router(site.router)

router.include_router(space_router)

openapi_tags = [*subject.openapi_tag]
