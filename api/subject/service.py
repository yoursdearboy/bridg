from datetime import date, datetime
from typing import List, Optional
from uuid import UUID

from pydantic import field_validator
from sqlalchemy.orm import Session

import bridg
from api.base_model import BaseModel


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


class StudySubjectService:
    def __init__(self, db: Session) -> None:
        self.db = db

    def new(self, data: NewStudySubject) -> bridg.StudySubject:
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
            return self.db.query(bridg.StudySiteProtocolVersionRelationship).filter_by(id=id).one()

        return bridg.StudySubject(
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

    def to_schema(self, obj):
        return StudySubject.model_validate(obj)

    def list(self, space_id: Optional[UUID] = None) -> List[StudySubject]:
        q = self.db.query(bridg.StudySubject)
        if space_id:
            q = (
                q.join(bridg.StudySubject.assigned_study_subject_protocol_version_relationship)
                .join(bridg.StudySubjectProtocolVersionRelationship.assigning_study_site_protocol_version_relationship)
                .filter(bridg.StudySiteProtocolVersionRelationship.executed_study_protocol_version_id == space_id)
            )
        return [StudySubject.model_validate(o) for o in q]

    def get(self, id: UUID) -> StudySubject | None:
        if obj := self.db.query(bridg.StudySubject).filter_by(id=id).one_or_none():
            return StudySubject.model_validate(obj)

    def create(self, data: NewStudySubject) -> StudySubject:
        obj = self.new(data)
        self.db.add(obj)
        self.db.commit()
        return self.to_schema(obj)

    def lookup(self, data: LookupStudySubject) -> List[FoundStudySubject]:
        q = self.db.query(bridg.BiologicEntity)
        if (pbe := data.performing_biologic_entity) and (n := pbe.name):
            q = q.filter(bridg.BiologicEntity.name.any(bridg.EntityName.family.ilike(f"%{n.family}%")))
            q = q.limit(10)
            return [
                FoundStudySubject(performing_biologic_entity=str(be), performing_biologic_entity_id=be.id) for be in q
            ]
        raise RuntimeError("Unknown performing entity")
