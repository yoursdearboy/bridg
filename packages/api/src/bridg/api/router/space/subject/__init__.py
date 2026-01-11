from datetime import datetime
from typing import Annotated, List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException

import bridg.alchemy
from bridg.api.context import Context, get_context
from bridg.api.db import get_repository
from bridg.api.model import BaseModel, Person, PersonData, StudySubject, StudySubjectData
from bridg.api.service.subject import StudySubjectRepository

from . import performed_activity, specimen

router = APIRouter(prefix="/subjects", tags=["subjects"])


class NewStudySubject(BaseModel[bridg.alchemy.StudySubject]):
    _sa = bridg.alchemy.StudySubject

    status: Optional[bridg.alchemy.Status]
    status_date: Optional[datetime]
    performing_biologic_entity: Optional[PersonData]
    performing_biologic_entity_id: Optional[UUID]

    assigned_study_site_protocol_version_relationship: List[UUID]

    def model_dump_sa(self, context: Optional[Context] = None) -> bridg.alchemy.StudySubject:
        if context is None:
            raise RuntimeError("No context")

        ss = bridg.alchemy.StudySubject(status=self.status, status_date=self.status_date)

        if self.performing_biologic_entity_id is not None:
            ss.performing_biologic_entity_id = self.performing_biologic_entity_id
        elif self.performing_biologic_entity:
            ss.performing_biologic_entity = self.performing_biologic_entity.model_dump_sa(context=context)
        else:
            raise RuntimeError("No performing biologic entity")

        for id in self.assigned_study_site_protocol_version_relationship:
            ss.assigned_study_site_protocol_version_relationship.append(
                context.db.query(bridg.alchemy.StudySiteProtocolVersionRelationship).filter_by(id=id).one()
            )

        return ss


class LookupStudySubject(BaseModel[bridg.alchemy.StudySubject]):
    _sa = bridg.alchemy.StudySubject

    performing_biologic_entity: Optional[PersonData]

    def model_dump_sa(self) -> bridg.alchemy.StudySubject:
        if pbe := self.performing_biologic_entity:
            return bridg.alchemy.StudySubject(performing_biologic_entity=pbe.model_dump_sa())
        raise RuntimeError("Unknown performing entity")


class FoundStudySubject(BaseModel[bridg.alchemy.StudySubject]):
    performing_biologic_entity: Optional[Person]


StudySubjectRepositoryDep = Annotated[StudySubjectRepository, Depends(get_repository(StudySubjectRepository))]


@router.get("")
def index(space_id: UUID, repo: StudySubjectRepositoryDep) -> List[StudySubject]:
    objs = repo.find_by(space_id=space_id)
    return [StudySubject.model_validate(obj) for obj in objs]


@router.get("/{subject_id:uuid}")
def show(space_id: UUID, subject_id: UUID, repo: StudySubjectRepositoryDep) -> StudySubject:
    if obj := repo.one_or_none(subject_id):
        return StudySubject.model_validate(obj)
    raise HTTPException(status_code=404)


@router.post("")
def create(
    space_id: UUID,
    data: NewStudySubject,
    repo: StudySubjectRepositoryDep,
    context: Annotated[Context, Depends(get_context)],
) -> StudySubject:
    obj = repo.create(data.model_dump_sa(context=context))
    return StudySubject.model_validate(obj)


@router.patch("/{subject_id:uuid}")
def update(space_id: UUID, subject_id: UUID, data: StudySubjectData, repo: StudySubjectRepositoryDep) -> StudySubject:
    if repo.exists(subject_id):
        obj = data.model_dump_sa()
        obj.id = subject_id
        obj = repo.update(obj)
        return StudySubject.model_validate(obj)
    raise HTTPException(status_code=404)


@router.post("/lookup")
def lookup(space_id: UUID, data: LookupStudySubject, repo: StudySubjectRepositoryDep) -> List[FoundStudySubject]:
    q = data.model_dump_sa()
    objs = repo.lookup(q)
    return [FoundStudySubject.model_validate(obj) for obj in objs]


router.include_router(performed_activity.router, prefix="/{subject_id:uuid}")
router.include_router(specimen.router, prefix="/{subject_id:uuid}")

openapi_tag = [{"name": "subjects"}, *performed_activity.openapi_tags]
