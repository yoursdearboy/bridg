from enum import Enum
from typing import List

import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from umdb.db import Base
from umdb.person.name.model import Name, primary_names


class Sex(Enum):
    male = "M"
    female = "F"
    unknown = "U"


class Person(Base):
    __tablename__ = "person"

    id: Mapped[int] = mapped_column(primary_key=True)

    sex = mapped_column(sa.Enum(Sex))
    birth_date = mapped_column(sa.Date())
    death_date = mapped_column(sa.Date())
    death_date_estimated_indicator = mapped_column(sa.Boolean())
    death_indicator = mapped_column(sa.Boolean())

    names: Mapped[List["Name"]] = relationship(cascade="all, delete-orphan")


Person.primary_name = relationship(
    sa.orm.aliased(Name, primary_names),
    primaryjoin=Person.id == primary_names.c.person_id,
    uselist=False,
)
