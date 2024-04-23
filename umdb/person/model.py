from enum import Enum
from typing import List

import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from umdb.db import Base


class Sex(Enum):
    male = "M"
    female = "F"
    unknown = "U"


class Name(Base):
    __tablename__ = "name"

    id: Mapped[int] = mapped_column(primary_key=True)

    use = mapped_column(sa.String())
    family = mapped_column(sa.String())
    given = mapped_column(sa.String())
    middle = mapped_column(sa.String())
    patronymic = mapped_column(sa.String())
    prefix = mapped_column(sa.String())
    suffix = mapped_column(sa.String())

    person_id: Mapped[int] = mapped_column(sa.ForeignKey("person.id"))
    person: Mapped["Person"] = relationship(back_populates="names")


class Person(Base):
    __tablename__ = "person"

    id: Mapped[int] = mapped_column(primary_key=True)

    sex = mapped_column(sa.Enum(Sex))
    birth_date = mapped_column(sa.Date())
    death_date = mapped_column(sa.Date())
    death_date_estimated_indicator = mapped_column(sa.Boolean())
    death_indicator = mapped_column(sa.Date())

    names: Mapped[List["Name"]] = relationship(
        back_populates="person", cascade="all, delete-orphan"
    )
