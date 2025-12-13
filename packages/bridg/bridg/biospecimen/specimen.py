from __future__ import annotations

from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..common import Material
from ..db import Base


class Specimen(Base):
    __tablename__ = "specimen"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    performing_material_id: Mapped[UUID] = mapped_column(ForeignKey("material.id"))
    performing_material: Mapped[Material] = relationship(back_populates="performed_specimen")
