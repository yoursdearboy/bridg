from datetime import date, datetime
from typing import Annotated, List, Optional, Protocol
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


class EntityName(BaseModel):
    use: Optional[str] = None
    family: Optional[str] = None
    given: Optional[str] = None
    middle: Optional[str] = None
    patronymic: Optional[str] = None
    prefix: Optional[str] = None
    suffix: Optional[str] = None

    def model_dump_sa(self) -> bridg.EntityName:
        return bridg.EntityName(
            use=self.use,
            family=self.family,
            given=self.given,
            middle=self.middle,
            patronymic=self.patronymic,
            prefix=self.prefix,
            suffix=self.suffix,
        )


def parse_optional_en(data: Optional[EntityName]) -> List[bridg.EntityName]:
    if data:
        return [data.model_dump_sa()]
    return []


class NewStudySubject(BaseModel):
    class Person(BaseModel):
        type: str = "person"
        administrative_gender_code: Optional[bridg.AdministrativeGender] = None
        birth_date: Optional[date] = None
        death_date: Optional[date] = None
        death_date_estimated_indicator: Optional[bool] = None
        death_indicator: Optional[bool] = None
        name: Optional[EntityName] = None

        def model_dump_sa(self) -> bridg.Person:
            return bridg.Person(
                name=parse_optional_en(self.name),
                administrative_gender_code=self.administrative_gender_code,
                birth_date=self.birth_date,
                death_date=self.death_date,
                death_date_estimated_indicator=self.death_date_estimated_indicator,
                death_indicator=self.death_indicator,
            )

    status: Optional[bridg.Status] = None
    status_date: Optional[datetime] = None
    performing_biologic_entity: Optional[Person] = None
    performing_biologic_entity_id: Optional[UUID] = None

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


class LookupStudySubject(BaseModel):
    class Person(BaseModel):
        name: Optional[EntityName] = None

        def model_dump_sa(self) -> bridg.Person:
            return bridg.Person(name=parse_optional_en(self.name))

    performing_biologic_entity: Optional[Person] = None

    def model_dump_sa(self) -> bridg.StudySubject:
        if pbe := self.performing_biologic_entity:
            return bridg.StudySubject(performing_biologic_entity=pbe.model_dump_sa())
        raise RuntimeError("Unknown performing entity")


class FoundStudySubject(BaseModel):
    performing_biologic_entity: Optional[str] = None
    performing_biologic_entity_id: Optional[UUID] = None


def dump_found(ss: bridg.StudySubject) -> FoundStudySubject:
    if pbe := ss.performing_biologic_entity:
        return FoundStudySubject(
            performing_biologic_entity=str(pbe),
            performing_biologic_entity_id=pbe.id,
        )
    raise RuntimeError("Unknown performing entity")


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
    obj = repo.create(data.model_dump_sa(db))
    return StudySubject.model_validate(obj)


@router.post("/lookup")
def lookup(space_id: UUID, data: LookupStudySubject, repo: StudySubjectRepositoryDep):
    return [dump_found(ss) for ss in repo.lookup(data.model_dump_sa())]


openapi_tag = [{"name": "subjects"}]
