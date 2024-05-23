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

    @property
    def full(self):
        parts = [self.prefix, self.given, self.middle, self.family, self.suffix]
        parts = [p for p in parts if p]
        s = " ".join(parts)
        s = "Anonymous" if s == "" else s
        return s


class Person(Base):
    __tablename__ = "person"

    id: Mapped[int] = mapped_column(primary_key=True)

    sex = mapped_column(sa.Enum(Sex))
    birth_date = mapped_column(sa.Date())
    death_date = mapped_column(sa.Date())
    death_date_estimated_indicator = mapped_column(sa.Boolean())
    death_indicator = mapped_column(sa.Boolean())

    names: Mapped[List["Name"]] = relationship(cascade="all, delete-orphan")


name_index = (
    sa.func.row_number()
    .over(partition_by=Name.person_id, order_by=sa.desc(Name.use))
    .label("i")
)

indexed_names = sa.select(Name, name_index).subquery()
primary_names = sa.select(indexed_names).filter(indexed_names.c.i == 1).subquery()

Person.primary_name = relationship(
    sa.orm.aliased(Name, primary_names),
    primaryjoin=Person.id == primary_names.c.person_id,
    uselist=False,
)
