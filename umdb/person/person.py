from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from umdb.common import BiologicEntity, Name

if TYPE_CHECKING:
    from umdb.organization.healthcare import HealthcareProvider


class Person(BiologicEntity):
    """A human being."""

    __tablename__ = "person"
    __mapper_args__ = {"polymorphic_identity": "person"}

    id: Mapped[int] = mapped_column(ForeignKey("biologic_entity.id"), primary_key=True)

    performed_healthcare_provider: Mapped["HealthcareProvider"] = relationship()
