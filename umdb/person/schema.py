from datetime import date
from typing import Optional
from pydantic import BaseModel, Field

from umdb.person.model import Sex
from umdb.person.name.schema import Name, NameCreate


class PersonAttributes:
    sex: Optional[Sex] = Field(None)
    birth_date: Optional[date] = Field(None)
    death_date: Optional[date] = Field(None)
    death_date_estimated_indicator: Optional[bool] = Field(None)
    death_indicator: Optional[bool] = Field(None)

    class Config:
        orm_mode = True


class PersonCreate(PersonAttributes, BaseModel):
    name: NameCreate


class Person(PersonAttributes, BaseModel):
    id: int
    primary_name: Optional[Name]


class PersonUpdate(PersonAttributes, BaseModel):
    pass
