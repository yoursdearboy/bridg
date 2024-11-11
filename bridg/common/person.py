from __future__ import annotations

from typing import TYPE_CHECKING, List

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .. import core
from .biologic_entity import BiologicEntity

if TYPE_CHECKING:
    from .healthcare import HealthcareProvider


class PostalAddress(core.PostalAddress):
    __tablename__ = "person_postal_address"

    id: Mapped[int] = mapped_column(primary_key=True)
    person_id: Mapped[int] = mapped_column(ForeignKey("person.id"))
    person: Mapped[Person] = relationship(back_populates="postal_address")


class TelecommunicationAddress(core.TelecommunicationAddress):
    __tablename__ = "person_telecom_address"

    id: Mapped[int] = mapped_column(primary_key=True)
    person_id: Mapped[int] = mapped_column(ForeignKey("person.id"))
    person: Mapped[Person] = relationship(back_populates="telecom_address")


class Person(BiologicEntity):
    """A human being."""

    __tablename__ = "person"
    __mapper_args__ = {"polymorphic_identity": "person"}

    id: Mapped[int] = mapped_column(ForeignKey("biologic_entity.id"), primary_key=True)

    performed_healthcare_provider: Mapped[HealthcareProvider] = relationship()

    postal_address: Mapped[List[PostalAddress]] = relationship(
        back_populates="person",
        cascade="all, delete-orphan",
    )

    telecom_address: Mapped[List[TelecommunicationAddress]] = relationship(
        back_populates="person",
        cascade="all, delete-orphan",
    )
