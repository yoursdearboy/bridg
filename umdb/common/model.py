from enum import Enum
from typing import List

import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from umdb.common.name.model import Name, primary_names
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
    type: Mapped[str] = mapped_column(sa.String())

    administrative_gender = mapped_column(sa.Enum(AdministrativeGender))
    birth_date = mapped_column(sa.Date())
    death_date = mapped_column(sa.Date())
    death_date_estimated_indicator = mapped_column(sa.Boolean())
    death_indicator = mapped_column(sa.Boolean())

    names: Mapped[List["Name"]] = relationship(cascade="all, delete-orphan")

    def __str__(self):
        return str(self.name)


BiologicEntity.name = relationship(
    sa.orm.aliased(Name, primary_names),
    primaryjoin=BiologicEntity.id == primary_names.c.biologic_entity_id,
    uselist=False,
)
