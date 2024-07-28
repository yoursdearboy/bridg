from datetime import date
from enum import Enum
from typing import List, Optional

import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from umdb.common.name import Name, primary_names
from umdb.db import Base


class AdministrativeGender(Enum):
    male = "M"
    female = "F"
    unknown = "U"


class BiologicEntity(Base):
    """
    Any individual living (or previously living) being.

    Attributes:
        id:
        administrative_gender:
        birth_date:
        death_date:
        death_date_estimated_indicator:
        death_indicator:
        name:
        primary_name:
    """

    __tablename__ = "biologic_entity"
    __mapper_args__ = {
        "polymorphic_identity": "biologic_entity",
        "polymorphic_on": "type",
    }

    id: Mapped[int] = mapped_column(primary_key=True)
    type: Mapped[str]

    administrative_gender: Mapped[Optional[AdministrativeGender]]
    birth_date: Mapped[Optional[date]]
    death_date: Mapped[Optional[date]]
    death_date_estimated_indicator: Mapped[Optional[bool]]
    death_indicator: Mapped[Optional[bool]]

    name: Mapped[List["Name"]] = relationship(
        back_populates="biologic_entity", cascade="all, delete-orphan"
    )

    def __str__(self):
        if not self.primary_name:
            return "Anonymous"
        return str(self.primary_name)


BiologicEntity.primary_name = relationship(
    sa.orm.aliased(Name, primary_names),
    primaryjoin=BiologicEntity.id == primary_names.c.biologic_entity_id,
    uselist=False,
)
