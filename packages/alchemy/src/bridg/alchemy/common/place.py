from __future__ import annotations

from typing import TYPE_CHECKING, List, Optional
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..datatype import ConceptDescriptor, TrivialName
from ..db import Base
from .id import ID

if TYPE_CHECKING:
    pass


class Place(Base):
    """
    DEFINITION:
    A bounded physical location which may contain structures.

    EXAMPLE(S):
    ambulance, helicopter, manufacturing site, service delivery location, home, emergency department, surgical suite, patient room

    OTHER NAME(S):

    NOTE(S):
    Constraints: Place may be natural or man-made. The geographic position of a place may or may not be constant.

    Discussion: Places may be work facilities (where relevant acts occur), homes (where people live) or offices (where people work). Places may contain sub-places (floor, room, booth, bed). Places may also be sites that are investigated in the context of health care, social work, public health administration (e.g., buildings, picnic grounds, day care centers, prisons, counties, states, and other focuses of epidemiological events).
    """

    __tablename__ = "place"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    identifier: Mapped[List[PlaceIdentifier]] = relationship(back_populates="place", cascade="all, delete-orphan")

    identifier_code_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("concept_descriptor.id"))
    identifier_code: Mapped[Optional[ConceptDescriptor]] = relationship(foreign_keys=identifier_code_id)

    name: Mapped[List[PlaceName]] = relationship(back_populates="place", cascade="all, delete-orphan")

    type_code_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("concept_descriptor.id"))
    type_code: Mapped[Optional[ConceptDescriptor]] = relationship(foreign_keys=type_code_id)

    actual_indicator: Mapped[bool] = mapped_column(default=True)


class PlaceIdentifier(ID):
    __tablename__ = "place_identifier"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    place_id: Mapped[UUID] = mapped_column(ForeignKey("place.id"))
    place: Mapped[Place] = relationship(back_populates="identifier")


class PlaceName(TrivialName, Base):
    __tablename__ = "place_name"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    place_id: Mapped[UUID] = mapped_column(ForeignKey("place.id"))
    place: Mapped[Place] = relationship(back_populates="name")
