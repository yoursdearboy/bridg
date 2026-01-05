from __future__ import annotations

from datetime import date
from typing import List, Optional
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base
from .administrative_gender import AdministrativeGender
from .entity_name import EntityName
from .id import ID


class BiologicEntity(Base):
    """
    Any individual living (or previously living) being.

    Attributes:
        id:
        administrative_gender_code:
        birth_date:
        death_date:
        death_date_estimated_indicator:
        death_indicator:
        name:
    """

    __tablename__ = "biologic_entity"
    __mapper_args__ = {
        "polymorphic_identity": "biologic_entity",
        "polymorphic_on": "type",
    }

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    type: Mapped[str]

    administrative_gender_code: Mapped[Optional[AdministrativeGender]]
    birth_date: Mapped[Optional[date]]
    death_date: Mapped[Optional[date]]
    death_date_estimated_indicator: Mapped[Optional[bool]]
    death_indicator: Mapped[Optional[bool]]

    identifier: Mapped[List[BiologicEntityIdentifier]] = relationship(
        back_populates="biologic_entity", cascade="all, delete-orphan"
    )

    name: Mapped[List[EntityName]] = relationship(back_populates="biologic_entity", cascade="all, delete-orphan")

    # FIXME: return something more meaningfull than first entry
    @property
    def primary_name(self) -> Optional[EntityName]:
        return next((n for n in self.name), None)

    def __str__(self):
        if not self.primary_name:
            return "Anonymous"
        return str(self.primary_name)


class BiologicEntityIdentifier(ID):
    __tablename__ = "biologic_entity_identifier"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    biologic_entity_id: Mapped[UUID] = mapped_column(ForeignKey("biologic_entity.id"))
    biologic_entity: Mapped[BiologicEntity] = relationship(back_populates="identifier")
