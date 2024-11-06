from datetime import date, datetime
from typing import List, Optional

from pydantic import BaseModel, RootModel


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

    id: int
    administrative_gender: Optional[str]
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

    id: int
    type: Optional[str]
    description: Optional[str]
    primary_name: Optional[OrganizationName]


class StudySubject(BaseModel):
    class Config:
        from_attributes = True

    id: Optional[int]
    performing_biologic_entity: Optional[BiologicEntity]
    performing_organization: Optional[Organization]
    status: Optional[str]
    status_date: Optional[datetime]


class StudySubjectList(RootModel[List[StudySubject]]):
    pass
