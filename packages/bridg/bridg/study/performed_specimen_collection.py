from __future__ import annotations

from typing import TYPE_CHECKING, Optional
from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .performed_procedure import PerformedProcedure

if TYPE_CHECKING:
    from ..biospecimen import Specimen


class PerformedSpecimenCollection(PerformedProcedure):
    __mapper_args__ = {"polymorphic_identity": "specimen_collection"}

    produced_specimen_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("specimen.id"))
    produced_specimen: Mapped[Optional[Specimen]] = relationship(
        back_populates="producing_performed_specimen_collection"
    )
