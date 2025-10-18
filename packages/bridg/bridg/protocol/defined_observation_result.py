from typing import Optional
from uuid import UUID, uuid4

import sqlalchemy.types as types
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..core import Code, code_column
from ..datatypes import DATATYPE_TO_CLASS, DataType, DataValue
from ..db import Base
from .defined_observation import DefinedObservation


class DataValueDecorator(types.TypeDecorator[DataValue]):
    impl = types.JSON

    cache_ok = True

    def process_bind_param(self, value: DataValue, dialect):
        if value is None:
            return None

        def _dump(o):
            if isinstance(o, list):
                return [_dump(x) for x in o]
            elif isinstance(o, dict):
                return {k: _dump(v) for k, v in o.items()}
            elif isinstance(o, DataType):
                return o.shortName
            elif isinstance(o, DataValue):
                return _dump(o.dict())
            else:
                return o

    def process_result_value(self, value: dict, dialect):
        dataType = value.pop("dataType")
        cls = DATATYPE_TO_CLASS[dataType]
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
