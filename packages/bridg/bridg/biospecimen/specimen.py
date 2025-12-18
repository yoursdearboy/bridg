from __future__ import annotations

from typing import Optional
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..common import Material
from ..db import Base
from ..study import PerformedSpecimenCollection


class Specimen(Base):
    """
    DEFINITION:
    A substance or portion of material originally obtained from an entity for use in testing, examination, or study.

    EXAMPLE(S):
    Blood obtained by a specimen collection activity performed on a study subject.
    A few grains of cattle feed obtained from a feed sack.
    A randomly selected pill from a blister pack.
    A serum specimen that resulted from Centrifugation procedure performed on a blood specimen.
    A DNA specimen extraction from a saliva specimen.
    A Formalin-Fixed, Paraffin-Embedded (FFPE) block that resulted from a paraffin embedding procedure performed on a formalin fixed tissue specimen.
    A pooled blood sample that resulted from a mixing procedure performed on several blood samples taken from individual animals.

    OTHER NAME(S):
    Biologic specimen
    Product specimen

    NOTE(S):
    """

    __tablename__ = "specimen"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    performing_material_id: Mapped[UUID] = mapped_column(ForeignKey("material.id"))
    performing_material: Mapped[Material] = relationship(back_populates="performed_specimen")

    producing_performed_specimen_collection_id: Mapped[Optional[UUID]] = mapped_column(
        ForeignKey("performed_activity.id")
    )
    producing_performed_specimen_collection: Mapped[Optional[PerformedSpecimenCollection]] = relationship(
        back_populates="produced_specimen"
    )
