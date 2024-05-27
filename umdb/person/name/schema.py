from typing import Optional
from pydantic import BaseModel


class NameAttributes:
    use: Optional[str]
    family: Optional[str]
    given: Optional[str]
    middle: Optional[str]
    patronymic: Optional[str]
    prefix: Optional[str]
    suffix: Optional[str]


class Name(NameAttributes, BaseModel):
    id: int
    full: str

    class Config:
        orm_mode = True


class NameUpdate(NameAttributes, BaseModel):
    class Config:
        orm_mode = True
