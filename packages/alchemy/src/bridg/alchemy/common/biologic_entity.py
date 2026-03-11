from __future__ import annotations

from datetime import date
from typing import TYPE_CHECKING, List, Optional
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..datatype import EntityName
from ..db import Base
from .administrative_gender import AdministrativeGender
from .id import ID

if TYPE_CHECKING:
    from .subject import AbstractSubject, ActualSubject, Subject


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

    __abstract__ = True

    administrative_gender_code: Mapped[Optional[AdministrativeGender]]
    birth_date: Mapped[Optional[date]]
    death_date: Mapped[Optional[date]]
    death_date_estimated_indicator: Mapped[Optional[bool]]
    death_indicator: Mapped[Optional[bool]]

    performed_subject: List[Subject]


# TODO: implement children?
class AbstractBiologicEntity(BiologicEntity):
    __tablename__ = "abstract_biologic_entity"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    type: Mapped[str]

    actual_indicator = False

    performed_subject: Mapped[List[AbstractSubject]] = relationship(
        back_populates="performing_biologic_entity",
    )


class ActualBiologicEntity(BiologicEntity):
    __tablename__ = "actual_biologic_entity"
    __mapper_args__ = {
        "polymorphic_identity": "biologic_entity",
        "polymorphic_on": "type",
    }

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    type: Mapped[str]

    actual_indicator = True

    identifier: Mapped[List[BiologicEntityIdentifier]] = relationship(
        back_populates="biologic_entity", cascade="all, delete-orphan"
    )

    name: Mapped[List[BiologicEntityName]] = relationship(
        back_populates="biologic_entity", cascade="all, delete-orphan"
    )

    performed_subject: Mapped[List[ActualSubject]] = relationship(
        back_populates="performing_biologic_entity",
    )


class BiologicEntityName(EntityName):
    __tablename__ = "biologic_entity_name"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    biologic_entity_id: Mapped[UUID] = mapped_column(ForeignKey("actual_biologic_entity.id"))
    biologic_entity: Mapped[ActualBiologicEntity] = relationship(back_populates="name")


class BiologicEntityIdentifier(ID):
    __tablename__ = "biologic_entity_identifier"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    biologic_entity_id: Mapped[UUID] = mapped_column(ForeignKey("actual_biologic_entity.id"))
    biologic_entity: Mapped[ActualBiologicEntity] = relationship(back_populates="identifier")
