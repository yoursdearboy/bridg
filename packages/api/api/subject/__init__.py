from datetime import datetime
from typing import Annotated, List, Optional
from uuid import UUID

import bridg
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from api.db import get_db, get_repository
from api.model import BaseModel, PersonData, StudySubject

from . import performed_activity
from .service import StudySubjectRepository

router = APIRouter(prefix="/subjects", tags=["subjects"])


class NewStudySubject(BaseModel[bridg.StudySubject]):
    _sa = bridg.StudySubject

    status: Optional[bridg.Status]
    status_date: Optional[datetime]
    performing_biologic_entity: Optional[PersonData]
    performing_biologic_entity_id: Optional[UUID]

    assigned_study_site_protocol_version_relationship: List[UUID]

    def model_dump_sa(self, db: Session) -> bridg.StudySubject:
        def find_or_parse_pbe(data: NewStudySubject) -> bridg.Person | None:
            if data.performing_biologic_entity_id is not None:
                return
            if data.performing_biologic_entity:
                return data.performing_biologic_entity.model_dump_sa()

        def find_sspvr(id: UUID) -> bridg.StudySiteProtocolVersionRelationship:
            return db.query(bridg.StudySiteProtocolVersionRelationship).filter_by(id=id).one()

        return bridg.StudySubject(
            status=self.status,
            status_date=self.status_date,
            performing_biologic_entity=find_or_parse_pbe(self),
            performing_biologic_entity_id=self.performing_biologic_entity_id,
            assigned_study_site_protocol_version_relationship=[
                find_sspvr(id) for id in self.assigned_study_site_protocol_version_relationship
            ],
        )


class LookupStudySubject(BaseModel[bridg.StudySubject]):
    _sa = bridg.StudySubject

    performing_biologic_entity: Optional[PersonData]

    def model_dump_sa(self) -> bridg.StudySubject:
        if pbe := self.performing_biologic_entity:
            return bridg.StudySubject(performing_biologic_entity=pbe.model_dump_sa())
        raise RuntimeError("Unknown performing entity")


StudySubjectRepositoryDep = Annotated[StudySubjectRepository, Depends(get_repository(StudySubjectRepository))]


@router.get("")
def index(space_id: UUID, repo: StudySubjectRepositoryDep) -> List[StudySubject]:
    objs = repo.find_by(space_id=space_id)
    return [StudySubject.model_validate(obj) for obj in objs]


@router.get("/{subject_id:uuid}")
def show(space_id: UUID, subject_id: UUID, repo: StudySubjectRepositoryDep) -> Optional[StudySubject]:
    if obj := repo.one_or_none(subject_id):
        return StudySubject.model_validate(obj)
    raise HTTPException(status_code=404)


@router.post("")
def create(
    space_id: UUID, data: NewStudySubject, repo: StudySubjectRepositoryDep, db: Session = Depends(get_db)
) -> StudySubject:
    obj = repo.create(data.model_dump_sa(db))
    return StudySubject.model_validate(obj)


@router.post("/lookup")
def lookup(space_id: UUID, data: LookupStudySubject, repo: StudySubjectRepositoryDep) -> List[StudySubject]:
    q = data.model_dump_sa()
    objs = repo.lookup(q)
    return [StudySubject.model_validate(obj) for obj in objs]


router.include_router(performed_activity.router, prefix="/{subject_id:uuid}")

openapi_tag = [{"name": "subjects"}, *performed_activity.openapi_tags]
