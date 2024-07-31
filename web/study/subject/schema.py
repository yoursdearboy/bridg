from datetime import date
from typing import List, Optional

import pydantic

from umdb.common import AdministrativeGender


class Name(pydantic.BaseModel):
    class Config:
        from_attributes = True

    use: Optional[str]
    family: Optional[str]
    given: Optional[str]
    middle: Optional[str]
    patronymic: Optional[str]
    prefix: Optional[str]
    suffix: Optional[str]


class BiologicEntity(pydantic.BaseModel):
    class Config:
        from_attributes = True

    administrative_gender: Optional[AdministrativeGender]
    birth_date: Optional[date]
    death_date: Optional[date]
    death_date_estimated_indicator: Optional[bool]
    death_indicator: Optional[bool]
    primary_name: Optional[Name]


class StudySubject(pydantic.BaseModel):
    class Config:
        from_attributes = True

    id: int
    performing_biologic_entity: BiologicEntity


class StudySubjectList(pydantic.RootModel[List[StudySubject]]):
    pass
