from datetime import date, datetime
from typing import Any, Optional, Type
from uuid import UUID, uuid4

from sqlalchemy import JSON, ForeignKey, TypeDecorator
from sqlalchemy import types as satypes
from sqlalchemy.orm import Mapped, mapped_column, relationship

from bridg import datatypes

from ..core import Code, code_column
from ..db import Base
from .defined_observation import DefinedObservation


# TODO: Move somewhere
class DataTypeDecorator(TypeDecorator):
    impl = satypes.Unicode

    cache_ok = True

    def process_bind_param(self, value: Type[datatypes.DataValue], dialect) -> str:
        if value is None:
            return None
        return value.data_type

    def process_result_value(self, value: str, dialect) -> Type[datatypes.DataValue]:
        cls = datatypes.DATA_TYPE_TO_TYPE[value]
        return cls


class DefinedObservationResult(Base):
    __tablename__ = "defined_observation_result"
    __mapper_args__ = {"polymorphic_on": "type", "polymorphic_identity": "observation_result"}

    class TypeCode(Code): ...

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    type: Mapped[str]

    _value: Mapped[Optional[Any]] = mapped_column("value", JSON)

    # TODO: Refactor this
    @property
    def value(self) -> Optional[Any]:
        if self._value is None:
            return None
        elif issubclass(self.value_type, datatypes.DateTime):
            if isinstance(self._value, str):
                return datetime.fromisoformat(self._value)
        elif issubclass(self.value_type, datatypes.Date):
            if isinstance(self._value, str):
                return date.fromisoformat(self._value)
        elif issubclass(self.value_type, datatypes.Quantity):
            if isinstance(self._value, int):
                return self._value
            elif isinstance(self._value, float):
                return self._value
        if issubclass(self.value_type, datatypes.CharacterString):
            if isinstance(self._value, str):
                return self._value
        raise RuntimeError("Can't parse value from database")

    @value.setter
    def value(self, value):
        if value is None:
            self._value = None
        elif issubclass(self.value_type, datatypes.DateTime):
            if isinstance(value, datetime):
                self._value = datetime.isoformat(value)
            else:
                raise RuntimeError("Can't serialize value to database")
        elif issubclass(self.value_type, datatypes.Date):
            if isinstance(value, date):
                self._value = date.isoformat(value)
            else:
                raise RuntimeError("Can't serialize value to database")
        elif issubclass(self.value_type, datatypes.Quantity):
            if isinstance(value, int):
                self._value = value
            elif isinstance(value, float):
                self._value = value
            else:
                raise RuntimeError("Can't serialize value to database")
        elif issubclass(self.value_type, datatypes.CharacterString):
            if isinstance(value, str):
                self._value = value
            else:
                raise RuntimeError("Can't serialize value to database")
        else:
            raise RuntimeError("Can't serialize value to database")

    value_type: Mapped[Type[datatypes.DataValue]] = mapped_column(DataTypeDecorator())
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
