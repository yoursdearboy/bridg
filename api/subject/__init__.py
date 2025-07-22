from datetime import date, datetime
from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends
from pydantic import field_validator
from sqlalchemy.orm import Session

import bridg
from api.base_model import BaseModel
from api.db import get_db

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
        postal_address: List[bridg.PostalAddress]
        telecom_address: List[bridg.TelecommunicationAddress]

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


@router.get("", response_model=List[StudySubject])
def index(space_id: UUID, db: Session = Depends(get_db)):
    spvr = db.query(bridg.StudyProtocolVersion).filter_by(id=space_id).one()
    return (
        db.query(bridg.StudySubject)
        .join(bridg.StudySubject.assigned_study_subject_protocol_version_relationship)
        .join(bridg.StudySubjectProtocolVersionRelationship.assigning_study_site_protocol_version_relationship)
        .filter(bridg.StudySiteProtocolVersionRelationship.executed_study_protocol_version == spvr)
    )


@router.get("{subject_id:uuid}", response_model=StudySubject)
def show(subject_id: UUID, db: Session = Depends(get_db)) -> Optional[bridg.StudySubject]:
    return db.query(bridg.StudySubject).filter_by(id=subject_id).one_or_none()


class NewStudySubject(BaseModel[bridg.StudySubject]):
    _sa = bridg.StudySubject

    class Person(BaseModel[bridg.Person]):
        _sa = bridg.Person

        class EntityName(BaseModel[bridg.EntityName]):
            _sa = bridg.EntityName

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
        name: List[EntityName]

    status: Optional[bridg.Status] = None
    status_date: Optional[datetime] = None
    performing_biologic_entity: Optional[Person] = None

    assigned_study_site_protocol_version_relationship: List[UUID]


@router.post("", response_model=StudySubject)
def create(space_id: UUID, data: NewStudySubject, db: Session = Depends(get_db)):
    def _find_sspvr(id):
        return db.query(bridg.StudySiteProtocolVersionRelationship).filter_by(id=id).one()

    obj = data.model_dump_sa()
    obj.assigned_study_site_protocol_version_relationship = [
        _find_sspvr(x) for x in data.assigned_study_site_protocol_version_relationship
    ]

    db.add(obj)
    db.commit()

    return obj
