from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from umdb.common import BiologicEntity, Name


class Person(BiologicEntity):
    """A human being."""

    __tablename__ = "person"
    __mapper_args__ = {"polymorphic_identity": "person"}

    id: Mapped[int] = mapped_column(ForeignKey("biologic_entity.id"), primary_key=True)
