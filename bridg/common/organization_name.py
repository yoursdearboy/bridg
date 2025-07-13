from __future__ import annotations

from typing import TYPE_CHECKING, Optional
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base

if TYPE_CHECKING:
    from .organization import Organization


class OrganizationName(Base):
    __tablename__ = "organization_name"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    value: Mapped[Optional[str]]

    organization_id: Mapped[UUID] = mapped_column(ForeignKey("organization.id"))
    organization: Mapped[Organization] = relationship(back_populates="name")

    def __str__(self):
        if not self.value:
            return "Unnamed"
        return self.value
