from datetime import date
from typing import Optional
from pydantic import BaseModel

from umdb.person.model import Sex
from umdb.person.name.schema import Name, NameCreate


class PersonAttributes:
    sex: Optional[Sex]
    birth_date: Optional[date]
    death_date: Optional[date]
    death_date_estimated_indicator: Optional[bool]
    death_indicator: Optional[bool]

    class Config:
        orm_mode = True


class PersonCreate(PersonAttributes, BaseModel):
    name: NameCreate


class Person(PersonAttributes, BaseModel):
    id: int
    primary_name: Optional[Name]


class PersonUpdate(PersonAttributes, BaseModel):
    pass
