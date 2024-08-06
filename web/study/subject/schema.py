from datetime import date, datetime
from typing import List, Optional

from pydantic import BaseModel, RootModel, computed_field


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

    @computed_field
    def full_primary_name(self) -> Optional[str]:
        if self.primary_name:
            return self.primary_name.full


class BiologicEntityList(RootModel[List[BiologicEntity]]):
    pass


class StudySubject(BaseModel):
    class Config:
        from_attributes = True

    id: int
    performing_biologic_entity: Optional[BiologicEntity]
    status: Optional[str]
    status_date: Optional[datetime]


class StudySubjectList(RootModel[List[StudySubject]]):
    pass
