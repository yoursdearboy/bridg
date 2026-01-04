from datetime import date, datetime
from typing import Optional
from uuid import UUID

from sqlalchemy import ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, composite, declared_attr, mapped_column, relationship

from .datatype import ConceptDescriptor, DataValue, PhysicalQuantity


class ObservationResult:
    value_st: Mapped[Optional[str]]

    value_cd_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("concept_descriptor.id"))

    @declared_attr
    def value_cd(cls) -> Mapped[Optional[ConceptDescriptor]]:
        return relationship(foreign_keys=cls.value_cd_id)  # type: ignore

    # FIXME: convert to optional
    # see https://github.com/abdulrahman305/sqlalchemy/commit/071abbb8636d81ff0c9a4ea8b8a972e63cf5ef54#diff-d54af7d55637bc92aefa7c48b51e08b36fa6cd7ae0adc5461d06638e438d08cbR331-R335
    @declared_attr
    def value_pq(cls) -> Mapped[Optional[PhysicalQuantity]]:
        return composite(
            lambda value, unit: PhysicalQuantity(value, unit) if value is not None else None,
            mapped_column("value_pq_value", Numeric, nullable=True),
            mapped_column("value_pq_unit", String, nullable=True),
        )

    value_date: Mapped[Optional[date]]

    value_datetime: Mapped[Optional[datetime]]

    def _reset(self):
        self.value_cd = None
        self.value_pq = None
        self.value_datetime = None
        self.value_date = None
        self.value_st = None

    @property
    def value(self) -> Optional[DataValue]:
        if self.value_cd:
            return self.value_cd
        elif self.value_pq:
            return self.value_pq
        elif self.value_datetime:
            return self.value_datetime
        elif self.value_date:
            return self.value_date
        elif self.value_st is not None:
            return self.value_st

    @value.setter
    def value(self, x: Optional[DataValue]):
        self._reset()
        if isinstance(x, ConceptDescriptor):
            self.value_cd = x
        elif isinstance(x, PhysicalQuantity):
            self.value_pq = x
        elif isinstance(x, datetime):
            self.value_datetime = x
        elif isinstance(x, date):
            self.value_date = x
        elif isinstance(x, str):
            self.value_st = x
