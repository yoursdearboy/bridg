from datetime import date, datetime
from typing import Any, Optional
from uuid import UUID, uuid4

from sqlalchemy import JSON, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..core import Code, code_column
from ..db import Base
from .defined_observation import DefinedObservation


class DefinedObservationResult(Base):
    __tablename__ = "defined_observation_result"
    __mapper_args__ = {"polymorphic_on": "type", "polymorphic_identity": "observation_result"}

    class TypeCode(Code): ...

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    type: Mapped[str]

    _value: Mapped[Optional[Any]] = mapped_column("value", JSON)

    @property
    def value(self) -> Optional[Any]:
        if self.value_type == "str":
            return str(self._value)
        elif self.value_type == "int":
            if isinstance(self._value, int):
                return int(self._value)
            if isinstance(self._value, str):
                return int(self._value)
        elif self.value_type == "date":
            if isinstance(self._value, str):
                return date.fromisoformat(self._value)
        elif self.value_type == "datetime":
            if isinstance(self._value, str):
                return datetime.fromisoformat(self._value)
        raise RuntimeError("Can't parse value from database")

    @value.setter
    def value(self, value):
        if self.value_type == "str":
            self._value = value
        elif self.value_type == "int":
            self._value = value
        elif self.value_type == "date":
            self._value = date.isoformat(value)
        elif self.value_type == "datetime":
            self._value = datetime.isoformat(value)
        else:
            raise RuntimeError("Can't serialize value to database")

    value_type: Mapped[str]
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
