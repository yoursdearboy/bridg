from typing import Optional
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey, TypeDecorator
from sqlalchemy import types as satypes
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..core import Code, code_column
from ..datatypes import DATA_TYPE_TO_TYPE, DataValue
from ..db import Base
from .defined_observation import DefinedObservation


# TODO: Move somewhere
class DataValueDecorator(TypeDecorator):
    impl = satypes.JSON

    cache_ok = True

    def process_bind_param(self, value: DataValue | None, dialect) -> dict | None:
        if value is None:
            return None
        data = value.__dict__
        data["data_type"] = value.data_type
        return data

    def process_result_value(self, value: dict | None, dialect) -> DataValue | None:
        if value is None:
            return None
        data_type = value.pop("data_type")
        cls = DATA_TYPE_TO_TYPE[data_type]
        return cls(**value)


class DefinedObservationResult(Base):
    __tablename__ = "defined_observation_result"
    __mapper_args__ = {"polymorphic_on": "type", "polymorphic_identity": "observation_result"}

    class TypeCode(Code): ...

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    type: Mapped[str]

    value: Mapped[Optional[DataValue]] = mapped_column(DataValueDecorator())

    value_negation_indicator: Mapped[Optional[bool]]

    type_code_id: Mapped[Optional[UUID]] = code_column(TypeCode)
    type_code: Mapped[Optional[TypeCode]] = relationship()

    derivation_expression: Mapped[Optional[str]]

    producing_defined_observation_id: Mapped[UUID] = mapped_column(ForeignKey("defined_activity.id"))
    producing_defined_observation: Mapped[DefinedObservation] = relationship(
        back_populates="produced_defined_observation_result"
    )
    """
    Each DefinedObservationResult always is a result of one DefinedObservation.
    Each DefinedObservation might result in one or more DefinedObservationResult.
    """
