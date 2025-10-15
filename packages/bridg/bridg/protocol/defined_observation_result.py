from datetime import date, datetime
from typing import Any, Optional, Type
from uuid import UUID, uuid4

import sqlalchemy.types as types
from sqlalchemy import JSON, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..core import Code, code_column
from ..datatypes import SYMBOL, SYMBOL_TO_CLASS, Boolean, CharacterString, DataValue, Date, DateTime, IntegerNumber
from ..db import Base
from .defined_observation import DefinedObservation


class DataValueTypeDecorator(types.TypeDecorator[DataValue]):
    impl = types.Unicode

    cache_ok = True

    def process_bind_param(self, value: DataValue, dialect):
        return value.SYMBOL

    def process_result_value(self, value: SYMBOL, dialect):
        cls = SYMBOL_TO_CLASS[value]
        return cls()


class DefinedObservationResult(Base):
    __tablename__ = "defined_observation_result"
    __mapper_args__ = {"polymorphic_on": "type", "polymorphic_identity": "observation_result"}

    class TypeCode(Code): ...

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    type: Mapped[str]

    _value: Mapped[Optional[Any]] = mapped_column("value", JSON)

    @property
    def value(self) -> Optional[Any]:
        match self.value_type:
            case DataValue():
                return self._value
            case Boolean():
                return self._value
            case CharacterString():
                return self._value
            case IntegerNumber():
                return self._value
            case Date():
                if isinstance(self._value, str):
                    return date.fromisoformat(self._value)
            case DateTime():
                if isinstance(self._value, str):
                    return datetime.fromisoformat(self._value)
        raise RuntimeError("Can't parse value from database")

    @value.setter
    def value(self, value):
        match self.value_type:
            case DataValue():
                return self._value
            case Boolean():
                self._value = value
            case CharacterString():
                self._value = value
            case IntegerNumber():
                self._value = value
            case Date():
                self._value = date.isoformat(value)
            case DateTime():
                self._value = datetime.isoformat(value)
        raise RuntimeError("Can't serialize value to database")

    value_type: Mapped[DataValue] = mapped_column(DataValueTypeDecorator())
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
