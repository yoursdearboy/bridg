from typing import Optional
from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..biospecimen import Specimen
from .performed_procedure import PerformedProcedure


class PerformedSpecimenCollection(PerformedProcedure):
    __mapper_args__ = {"polymorphic_identity": "specimen_collection"}

    produced_specimen_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("specimen.id"))
    produced_specimen: Mapped[Specimen] = relationship()
