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

    names: Mapped[List["Name"]] = relationship(cascade="all, delete-orphan")


BiologicEntity.name = relationship(
    sa.orm.aliased(Name, primary_names),
    primaryjoin=BiologicEntity.id == primary_names.c.biologic_entity_id,
    uselist=False,
)
