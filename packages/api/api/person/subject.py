from datetime import datetime
from typing import Annotated, List, Optional
from uuid import UUID

import bridg
from fastapi import APIRouter, Depends

from api.base_model import BaseModel
from api.db import get_repository
from api.model import StudySiteProtocolVersionRelationship
from api.subject.service import StudySubjectRepository

router = APIRouter(prefix="/subject", tags=["person_subject"])


class PersonStudySubject(BaseModel):
    id: UUID
    status: Optional[bridg.Status]
    status_date: Optional[datetime]
    assigned_study_site_protocol_version_relationship: List[StudySiteProtocolVersionRelationship]


StudySubjectRepositoryDep = Annotated[StudySubjectRepository, Depends(get_repository(StudySubjectRepository))]


@router.get("")
def index(person_id: UUID, repo: StudySubjectRepositoryDep) -> List[PersonStudySubject]:
    objs = repo.find_by(performing_biologic_entity_id=person_id)
    return [PersonStudySubject.model_validate(obj) for obj in objs]
