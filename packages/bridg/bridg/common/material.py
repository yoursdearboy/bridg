from __future__ import annotations

from typing import TYPE_CHECKING, Optional
from uuid import UUID, uuid4

from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base

if TYPE_CHECKING:
    from ..biospecimen import Specimen


class Material(Base):
    """
    DEFINITION:
    A physical substance or system.

    EXAMPLE(S):
    drugs such as aspirin
    devices such as pacemakers or freezers
    systems such as software programs
    biologics such as blood
    food products such as broccoli
    cosmetics such as lipstick
    containers such as a blister pack or a test tube

    OTHER NAME(S):

    NOTE(S):
    Materials may be naturally occurring or may be made by natural or engineered processes.
    """

    __tablename__ = "material"
    __mapper_args__ = {"concrete": True, "polymorphic_identity": "material", "polymorphic_on": "type"}

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    type: Mapped[str]

    performed_specimen: Mapped[Optional[Specimen]] = relationship(back_populates="performing_material")
