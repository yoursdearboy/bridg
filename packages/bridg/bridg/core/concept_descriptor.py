from __future__ import annotations

from typing import TYPE_CHECKING, Optional
from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base

if TYPE_CHECKING:
    from .code_system import CodeSystem


# FIXME: somehow align with datatypes.ConceptDescriptor and core.Code
class ConceptDescriptor(Base):
    __tablename__ = "concept_descriptor"

    code: Mapped[str] = mapped_column(primary_key=True)
    display_name: Mapped[Optional[str]]

    code_system_id: Mapped[UUID] = mapped_column(ForeignKey("code_system.id"), primary_key=True)
    code_system: Mapped[CodeSystem] = relationship(back_populates="concept")
