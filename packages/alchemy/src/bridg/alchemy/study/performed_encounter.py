from __future__ import annotations

from typing import Optional
from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..common import Place
from ..datatype import ConceptDescriptor
from .performed_activity import PerformedActivity


class PerformedEncounter(PerformedActivity):
    __mapper_args__ = {"polymorphic_identity": "encounter"}

    classification_code_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("concept_descriptor.id"))
    classification_code: Mapped[Optional[ConceptDescriptor]] = relationship(foreign_keys=classification_code_id)

    departing_to_place_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("place.id"))
    departing_to_place: Mapped[Optional[Place]] = relationship(foreign_keys=departing_to_place_id)

    arriving_from_place_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("place.id"))
    arriving_from_place: Mapped[Optional[Place]] = relationship(foreign_keys=arriving_from_place_id)
