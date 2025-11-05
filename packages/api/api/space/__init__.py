from typing import Annotated, List

import bridg
from bridg import Repository
from fastapi import APIRouter, Depends

from api import site, subject
from api.db import get_repository
from api.model import StudyProtocolVersion

router = APIRouter(prefix="/spaces")


class StudyProtocolVersionRepository(Repository[bridg.StudyProtocolVersion]):
    _sa = bridg.StudyProtocolVersion


StudyProtocolVersionRepositoryDep = Annotated[
    StudyProtocolVersionRepository, Depends(get_repository(StudyProtocolVersionRepository))
]


@router.get("")
def index(repo: StudyProtocolVersionRepositoryDep) -> List[StudyProtocolVersion]:
    objs = repo.all()
    return [StudyProtocolVersion.model_validate(o) for o in objs]


space_router = APIRouter(prefix="/{space_id:uuid}")
space_router.include_router(subject.router)
space_router.include_router(site.router)

router.include_router(space_router)

openapi_tags = [*subject.openapi_tag]
