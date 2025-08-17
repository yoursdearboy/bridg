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
    def _new_ss(data: NewStudySubject) -> bridg.StudySubject:
        return bridg.StudySubject(
            status=data.status,
            status_date=data.status_date,
            performing_biologic_entity=_find_or_new_pbe(data),
            performing_biologic_entity_id=data.performing_biologic_entity_id,
            assigned_study_site_protocol_version_relationship=[
                _find_sspvr(id) for id in data.assigned_study_site_protocol_version_relationship
            ],
        )

    def _find_or_new_pbe(data: NewStudySubject) -> bridg.Person | None:
        if data.performing_biologic_entity_id is not None:
            return
        if data.performing_biologic_entity:
            return _new_pbe(data.performing_biologic_entity)

    def _new_pbe(data: NewStudySubject.Person) -> bridg.Person:
        return bridg.Person(
            name=[_new_en(n) for n in [data.name] if n],
            administrative_gender_code=data.administrative_gender_code,
            birth_date=data.birth_date,
            death_date=data.death_date,
            death_date_estimated_indicator=data.death_date_estimated_indicator,
            death_indicator=data.death_indicator,
        )

    def _new_en(data: NewStudySubject.Person.EntityName) -> bridg.EntityName:
        return bridg.EntityName(
            use=data.use,
            family=data.family,
            given=data.given,
            middle=data.middle,
            patronymic=data.patronymic,
            prefix=data.prefix,
            suffix=data.suffix,
        )

    def _find_sspvr(id: UUID) -> bridg.StudySiteProtocolVersionRelationship:
        return db.query(bridg.StudySiteProtocolVersionRelationship).filter_by(id=id).one()

    obj = repo.create(_new_ss(data))

    return StudySubject.model_validate(obj)


@router.post("/lookup")
def lookup(space_id: UUID, data: LookupStudySubject, repo: StudySubjectRepositoryDep):
    def _parse_ss(data: LookupStudySubject) -> bridg.StudySubject:
        if pbe := data.performing_biologic_entity:
            return bridg.StudySubject(performing_biologic_entity=_parse_pbe(pbe))
        raise RuntimeError("Unknown performing entity")

    def _parse_pbe(data: LookupStudySubject.Person) -> bridg.Person:
        return bridg.Person(name=[_parse_en(n) for n in [data.name] if n])

    def _parse_en(data: LookupStudySubject.Person.EntityName) -> bridg.EntityName:
        return bridg.EntityName(
            use=data.use,
            family=data.family,
            given=data.given,
            middle=data.middle,
            patronymic=data.patronymic,
            prefix=data.prefix,
            suffix=data.suffix,
        )

    def _dump_found(ss: bridg.StudySubject) -> FoundStudySubject:
        if pbe := ss.performing_biologic_entity:
            return FoundStudySubject(
                performing_biologic_entity=str(pbe),
                performing_biologic_entity_id=pbe.id,
            )
        raise RuntimeError("Unknown performing entity")

    return [_dump_found(ss) for ss in repo.lookup(_parse_ss(data))]


openapi_tag = [{"name": "subjects"}]
