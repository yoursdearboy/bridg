from typing import Optional
from uuid import UUID, uuid4

from sqlalchemy import Enum as Enum
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..datatype import ConceptDescriptor
from ..db import Base
from ..observation_result import ObservationResult, ValueType
from .defined_observation import DefinedObservation


class DefinedObservationResult(ObservationResult, Base):
    __tablename__ = "defined_observation_result"
    __mapper_args__ = {"polymorphic_on": "type", "polymorphic_identity": "observation_result"}

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    type: Mapped[str]

    value_negation_indicator: Mapped[Optional[bool]]

    type_code_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("concept_descriptor.id"))
    type_code: Mapped[Optional[ConceptDescriptor]] = relationship(foreign_keys=type_code_id)

    target_type: Mapped[ValueType] = mapped_column(Enum(ValueType, values_callable=lambda x: [i.value for i in x]))

    target_coding_system: Mapped[Optional[str]] = mapped_column(ForeignKey("concept_descriptor.code_system"))

    target_unit: Mapped[Optional[str]]

    derivation_expression: Mapped[Optional[str]]

    producing_defined_observation_id: Mapped[UUID] = mapped_column(ForeignKey("defined_activity.id"))
    producing_defined_observation: Mapped[DefinedObservation] = relationship(
        back_populates="produced_defined_observation_result"
    )
    """
    Each DefinedObservationResult always is a result of one DefinedObservation.
    Each DefinedObservation might result in one or more DefinedObservationResult.
    """
