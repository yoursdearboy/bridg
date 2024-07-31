from datetime import date
from typing import List, Optional

from pydantic import BaseModel, RootModel, computed_field

from umdb.common import AdministrativeGender


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

    administrative_gender: Optional[AdministrativeGender]
    birth_date: Optional[date]
    death_date: Optional[date]
    death_date_estimated_indicator: Optional[bool]
    death_indicator: Optional[bool]
    primary_name: Optional[Name]

    @computed_field
    def full_primary_name(self) -> Optional[str]:
        if self.primary_name:
            return self.primary_name.full


class StudySubject(BaseModel):
    class Config:
        from_attributes = True

    id: int
    performing_biologic_entity: BiologicEntity


class StudySubjectList(RootModel[List[StudySubject]]):
    pass
