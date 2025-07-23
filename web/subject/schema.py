from datetime import date, datetime
from typing import Any, List, Optional, Self
from uuid import UUID

from flask import url_for
from pydantic import (
    BaseModel,
    RootModel,
    ValidationError,
    computed_field,
    model_validator,
)

import bridg


class Name(BaseModel):
    class Config:
        from_attributes = True

    use: Optional[str]
    family: Optional[str]
    given: Optional[str]
    middle: Optional[str]
    patronymic: Optional[str]
    prefix: Optional[str]
    suffix: Optional[str]
    full: str


class BiologicEntity(BaseModel):
    class Config:
        from_attributes = True

    id: UUID
    administrative_gender_code: Optional[str]
    birth_date: Optional[date]
    death_date: Optional[date]
    death_date_estimated_indicator: Optional[bool]
    death_indicator: Optional[bool]
    primary_name: Optional[Name]


class OrganizationName(BaseModel):
    class Config:
        from_attributes = True

    value: Optional[str]


class Organization(BaseModel):
    class Config:
        from_attributes = True

    id: UUID
    type: Optional[str]
    description: Optional[str]
    primary_name: Optional[OrganizationName]


class StudySubject(BaseModel):
    class Config:
        from_attributes = True

    id: Optional[UUID]
    performing_biologic_entity: Optional[BiologicEntity]
    performing_organization: Optional[Organization]
    status: Optional[str]
    status_date: Optional[datetime]
    _study_protocol_version_id: UUID

    @model_validator(mode="wrap")
    @classmethod
    def get_study_protocol_version(cls, value: Any, handler) -> Self:
        if isinstance(value, bridg.StudySubject):
            study_protocol_version_id = next(
                x.executed_study_protocol_version.id for x in value.assigned_study_site_protocol_version_relationship
            )
            if study_protocol_version_id is None:
                raise ValidationError("Unknown study protocol version")
        model: Self = handler(value)
        model._study_protocol_version_id = study_protocol_version_id
        return model

    @computed_field
    def url(self) -> str:
        return url_for(
            ".show",
            space_id=self._study_protocol_version_id,
            id=self.id,
        )


class StudySubjectList(RootModel[List[StudySubject]]):
    pass


class StudySubjectLookup(BaseModel):
    class Config:
        from_attributes = True

    id: Optional[UUID]
    performing_biologic_entity: Optional[BiologicEntity]
    performing_organization: Optional[Organization]
    status: Optional[str]
    status_date: Optional[datetime]


class StudySubjectLookupList(RootModel[List[StudySubjectLookup]]):
    pass
