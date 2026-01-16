from datetime import datetime
from typing import Annotated, List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends

import bridg.alchemy
from bridg.api.db import get_repository
from bridg.api.model import BaseModel, StudySiteProtocolVersionRelationship
from bridg.api.service.subject import StudySubjectRepository

router = APIRouter(prefix="/subject")


class PersonStudySubject(BaseModel):
    id: UUID
    status: Optional[bridg.alchemy.Status]
    status_date: Optional[datetime]
    assigned_study_site_protocol_version_relationship: List[StudySiteProtocolVersionRelationship]


StudySubjectRepositoryDep = Annotated[StudySubjectRepository, Depends(get_repository(StudySubjectRepository))]


@router.get("", operation_id="list_person_subject")
def index(person_id: UUID, repo: StudySubjectRepositoryDep) -> List[PersonStudySubject]:
    objs = repo.find_by(performing_biologic_entity_id=person_id)
    return [PersonStudySubject.model_validate(obj) for obj in objs]
