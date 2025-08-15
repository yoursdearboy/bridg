from typing import Annotated, List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import bridg
from api.db import get_db

from .service import (
    FoundStudySubject,
    LookupStudySubject,
    NewStudySubject,
    StudySubject,
    StudySubjectService,
)


def get_study_subject_service(db: Session = Depends(get_db)):
    return StudySubjectService(db)


StudySubjectServiceDep = Annotated[StudySubjectService, Depends(get_study_subject_service)]


router = APIRouter(prefix="/subjects", tags=["subjects"])


@router.get("", response_model=List[StudySubject])
def index(space_id: UUID, db: Session = Depends(get_db)):
    spvr = db.query(bridg.StudyProtocolVersion).filter_by(id=space_id).one()
    return (
        db.query(bridg.StudySubject)
        .join(bridg.StudySubject.assigned_study_subject_protocol_version_relationship)
        .join(bridg.StudySubjectProtocolVersionRelationship.assigning_study_site_protocol_version_relationship)
        .filter(bridg.StudySiteProtocolVersionRelationship.executed_study_protocol_version == spvr)
    )


@router.get("/{subject_id:uuid}", response_model=StudySubject)
def show(space_id: UUID, subject_id: UUID, db: Session = Depends(get_db)) -> Optional[bridg.StudySubject]:
    return db.query(bridg.StudySubject).filter_by(id=subject_id).one_or_none()


@router.post("", response_model=StudySubject)
def create(space_id: UUID, data: NewStudySubject, service: StudySubjectServiceDep):
    return service.create(data)


@router.post("/lookup", response_model=List[FoundStudySubject])
def lookup(space_id: UUID, data: LookupStudySubject, service: StudySubjectServiceDep):
    return service.lookup(data)


openapi_tag = [{"name": "subjects"}]
