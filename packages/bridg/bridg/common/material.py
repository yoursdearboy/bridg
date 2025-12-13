from __future__ import annotations

from typing import TYPE_CHECKING, Optional
from uuid import UUID, uuid4

from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base

if TYPE_CHECKING:
    from ..biospecimen import Specimen


class Material(Base):
    __tablename__ = "material"
    __mapper_args__ = {"concrete": True, "polymorphic_identity": "material", "polymorphic_on": "type"}

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    type: Mapped[str]

    performed_specimen: Mapped[Optional[Specimen]] = relationship(back_populates="performing_material")
