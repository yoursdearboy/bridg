from __future__ import annotations

from typing import TYPE_CHECKING, Optional

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base

if TYPE_CHECKING:
    from .biologic_entity import BiologicEntity


class EntityName(Base):
    __tablename__ = "biologic_entity_name"

    id: Mapped[int] = mapped_column(primary_key=True)

    use: Mapped[Optional[str]]
    family: Mapped[Optional[str]]
    given: Mapped[Optional[str]]
    middle: Mapped[Optional[str]]
    patronymic: Mapped[Optional[str]]
    prefix: Mapped[Optional[str]]
    suffix: Mapped[Optional[str]]

    biologic_entity_id: Mapped[int] = mapped_column(ForeignKey("biologic_entity.id"))
    biologic_entity: Mapped[BiologicEntity] = relationship(back_populates="name")

    @property
    def full(self):
        parts = [self.prefix, self.given, self.middle, self.family, self.suffix]
        parts = [p for p in parts if p]
        s = " ".join(parts)
        s = "Anonymous" if s == "" else s
        return s

    def __str__(self):
        return self.full
