from __future__ import annotations

from typing import TYPE_CHECKING, List

from sqlalchemy.orm import Mapped, relationship

from .performed_procedure import PerformedProcedure

if TYPE_CHECKING:
    from ..biospecimen import Specimen


class PerformedSpecimenCollection(PerformedProcedure):
    __mapper_args__ = {"polymorphic_identity": "specimen_collection"}

    produced_specimen: Mapped[List[Specimen]] = relationship(back_populates="producing_performed_specimen_collection")
