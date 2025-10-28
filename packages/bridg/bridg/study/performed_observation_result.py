from datetime import datetime
from typing import Optional
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from hl7.datatypes import DataValue

from ..core import ConceptDescriptor
from ..data_value_decorator import DataValueDecorator
from ..db import Base
from .performed_observation import PerformedObservation


class PerformedObservationResult(Base):
    __tablename__ = "performed_observation_result"
    __mapper_args__ = {"polymorphic_on": "type", "polymorphic_identity": "observation_result"}

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    type: Mapped[str]

    type_code_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("concept_descriptor.id"))
    type_code: Mapped[Optional[ConceptDescriptor]] = relationship(foreign_keys=type_code_id)

    value: Mapped[Optional[DataValue]] = mapped_column(DataValueDecorator())
    value_null_flavor_reason: Mapped[Optional[str]]

    baseline_indicator: Mapped[Optional[bool]]
    derived_indicator: Mapped[Optional[bool]]

    created_date: Mapped[Optional[datetime]]
    reported_date: Mapped[Optional[datetime]]

    comment: Mapped[Optional[str]]

    producing_performed_observation_id: Mapped[UUID] = mapped_column(ForeignKey("performed_activity.id"))
    producing_performed_observation: Mapped[PerformedObservation] = relationship(
        back_populates="resulted_performed_observation_result"
    )
    """
    Each PerformedObservationResult always is a result of one PerformedObservation.
    Each PerformedObservation might result in one or more PerformedObservationResult.
    """
