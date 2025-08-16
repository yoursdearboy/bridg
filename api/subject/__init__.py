from datetime import date, datetime
from typing import Annotated, List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends
from pydantic import field_validator
from sqlalchemy.orm import Session

import bridg
from api.base_model import BaseModel
from api.db import get_db

from .service import StudySubjectRepository


def get_study_subject_repository(db: Session = Depends(get_db)):
    return StudySubjectRepository(db)


StudySubjectRepositoryDep = Annotated[StudySubjectRepository, Depends(get_study_subject_repository)]


router = APIRouter(prefix="/subjects", tags=["subjects"])


class StudySubject(BaseModel):
    class Person(BaseModel):
        id: UUID
        administrative_gender_code: Optional[bridg.AdministrativeGender]
        birth_date: Optional[date]
        death_date: Optional[date]
        death_date_estimated_indicator: Optional[bool]
        death_indicator: Optional[bool]
        primary_name: Optional[str]

        @field_validator("primary_name", mode="before")
        @classmethod
        def convert_primary_name(cls, value: bridg.EntityName) -> str:
            return str(value)

    class Organization(BaseModel):
        id: UUID
        description: Optional[str]
        primary_name: Optional[str]

        @field_validator("primary_name", mode="before")
        @classmethod
        def convert_primary_name(cls, value: bridg.OrganizationName) -> str:
            return str(value)

    id: UUID
    status: Optional[bridg.Status]
    status_date: Optional[datetime]
    performing_biologic_entity: Optional[Person]
    performing_organization: Optional[Organization]


class NewStudySubject(BaseModel):
    class Person(BaseModel):
        class EntityName(BaseModel):
            use: Optional[str] = None
            family: Optional[str] = None
            given: Optional[str] = None
            middle: Optional[str] = None
            patronymic: Optional[str] = None
            prefix: Optional[str] = None
            suffix: Optional[str] = None

        type: str = "person"
        administrative_gender_code: Optional[bridg.AdministrativeGender] = None
        birth_date: Optional[date] = None
        death_date: Optional[date] = None
        death_date_estimated_indicator: Optional[bool] = None
        death_indicator: Optional[bool] = None
        name: Optional[EntityName] = None

    status: Optional[bridg.Status] = None
    status_date: Optional[datetime] = None
    performing_biologic_entity: Optional[Person] = None
    performing_biologic_entity_id: Optional[UUID] = None

    assigned_study_site_protocol_version_relationship: List[UUID]


class LookupStudySubject(BaseModel):
    class Person(BaseModel):
        class EntityName(BaseModel):
            use: Optional[str] = None
            family: Optional[str] = None
            given: Optional[str] = None
            middle: Optional[str] = None
            patronymic: Optional[str] = None
            prefix: Optional[str] = None
            suffix: Optional[str] = None

        name: Optional[EntityName] = None

    performing_biologic_entity: Optional[Person] = None


class FoundStudySubject(BaseModel):
    performing_biologic_entity: Optional[str] = None
    performing_biologic_entity_id: Optional[UUID] = None


@router.get("")
def index(space_id: UUID, repo: StudySubjectRepositoryDep) -> List[StudySubject]:
    return [StudySubject.model_validate(obj) for obj in repo.list(space_id=space_id)]


@router.get("/{subject_id:uuid}")
def show(space_id: UUID, subject_id: UUID, repo: StudySubjectRepositoryDep) -> Optional[StudySubject]:
    if obj := repo.get(subject_id):
        return StudySubject.model_validate(obj)


@router.post("")
def create(
    space_id: UUID, data: NewStudySubject, repo: StudySubjectRepositoryDep, db: Session = Depends(get_db)
) -> StudySubject:
    def _find_pbe(data: NewStudySubject) -> bridg.Person | None:
        if data.performing_biologic_entity_id is not None:
            return
        if data_pbe := data.performing_biologic_entity:
            return bridg.Person(
                name=[_new_en(n) for n in [data_pbe.name] if n],
                **data_pbe.model_dump(exclude={"name"}),
            )

    def _new_en(data: NewStudySubject.Person.EntityName) -> bridg.EntityName:
        return bridg.EntityName(**data.model_dump())

    def _find_sspvr(id: UUID) -> bridg.StudySiteProtocolVersionRelationship:
        return db.query(bridg.StudySiteProtocolVersionRelationship).filter_by(id=id).one()

    ss = bridg.StudySubject(
        performing_biologic_entity=_find_pbe(data),
        assigned_study_site_protocol_version_relationship=map(
            _find_sspvr, data.assigned_study_site_protocol_version_relationship
        ),
        **data.model_dump(
            exclude={
                "performing_biologic_entity",
                "assigned_study_site_protocol_version_relationship",
            }
        ),
    )

    obj = repo.create(ss)

    return StudySubject.model_validate(obj)


@router.post("/lookup")
def lookup(space_id: UUID, data: LookupStudySubject, repo: StudySubjectRepositoryDep):
    ss = bridg.StudySubject(
        performing_biologic_entity=bridg.Person(
            name=[bridg.EntityName(**data.performing_biologic_entity.name.model_dump())]
            if data.performing_biologic_entity.name
            else None,
            **data.performing_biologic_entity.model_dump(exclude={"name"}),
        )
        if data.performing_biologic_entity
        else None
    )
    return [
        FoundStudySubject(
            performing_biologic_entity=str(f.performing_biologic_entity) if f.performing_biologic_entity else None,
            performing_biologic_entity_id=f.performing_biologic_entity.id if f.performing_biologic_entity else None,
        )
        for f in repo.lookup(ss)
    ]


openapi_tag = [{"name": "subjects"}]
