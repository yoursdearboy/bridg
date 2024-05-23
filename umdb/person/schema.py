from datetime import date
from typing import Optional
from pydantic import BaseModel

from umdb.person.model import Sex


class Name(BaseModel):
    id: int
    use: Optional[str]
    family: Optional[str]
    given: Optional[str]
    middle: Optional[str]
    patronymic: Optional[str]
    prefix: Optional[str]
    suffix: Optional[str]
    full: str

    class Config:
        orm_mode = True


class PersonAttributes:
    sex: Optional[Sex]
    birth_date: Optional[date]
    death_date: Optional[date]
    death_date_estimated_indicator: Optional[bool]
    death_indicator: Optional[bool]

    class Config:
        orm_mode = True


class Person(PersonAttributes, BaseModel):
    id: int
    primary_name: Optional[Name]

    class Config:
        orm_mode = True


class PersonUpdate(PersonAttributes, BaseModel):
    class Config:
        orm_mode = True
