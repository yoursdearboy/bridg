from __future__ import annotations

from typing import TYPE_CHECKING, Optional
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base

if TYPE_CHECKING:
    from .biologic_entity import BiologicEntity


class EntityName(Base):
    __tablename__ = "biologic_entity_name"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)

    use: Mapped[Optional[str]]
    family: Mapped[Optional[str]]
    given: Mapped[Optional[str]]
    middle: Mapped[Optional[str]]
    patronymic: Mapped[Optional[str]]
    prefix: Mapped[Optional[str]]
    suffix: Mapped[Optional[str]]

    biologic_entity_id: Mapped[UUID] = mapped_column(ForeignKey("biologic_entity.id"))
    biologic_entity: Mapped[BiologicEntity] = relationship(back_populates="name")
