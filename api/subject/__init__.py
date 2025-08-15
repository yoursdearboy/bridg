from typing import Annotated, Optional
from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from api.db import get_db

from .service import LookupStudySubject, NewStudySubject, StudySubject, StudySubjectService


def get_study_subject_service(db: Session = Depends(get_db)):
    return StudySubjectService(db)


StudySubjectServiceDep = Annotated[StudySubjectService, Depends(get_study_subject_service)]


router = APIRouter(prefix="/subjects", tags=["subjects"])


@router.get("")
def index(space_id: UUID, service: StudySubjectServiceDep):
    return service.list(space_id=space_id)


@router.get("/{subject_id:uuid}")
def show(space_id: UUID, subject_id: UUID, service: StudySubjectServiceDep) -> Optional[StudySubject]:
    return service.get(subject_id)


@router.post("")
def create(space_id: UUID, data: NewStudySubject, service: StudySubjectServiceDep):
    return service.create(data)


@router.post("/lookup")
def lookup(space_id: UUID, data: LookupStudySubject, service: StudySubjectServiceDep):
    return service.lookup(data)


openapi_tag = [{"name": "subjects"}]
