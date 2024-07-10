from typing import Optional
from pydantic import BaseModel, Field


class NameAttributes:
    use: Optional[str] = Field(None)
    family: Optional[str] = Field(None)
    given: Optional[str] = Field(None)
    middle: Optional[str] = Field(None)
    patronymic: Optional[str] = Field(None)
    prefix: Optional[str] = Field(None)
    suffix: Optional[str] = Field(None)

    class Config:
        orm_mode = True


class NameCreate(NameAttributes, BaseModel):
    pass


class Name(NameAttributes, BaseModel):
    id: int
    full: str


class NameUpdate(NameAttributes, BaseModel):
    pass
