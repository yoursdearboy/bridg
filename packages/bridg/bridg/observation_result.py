from typing import Optional
from uuid import UUID

from sqlalchemy import ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, composite, declared_attr, mapped_column, relationship

from .datatype import ConceptDescriptor, DataValue, PhysicalQuantity, date, datetime


class ObservationResult:
    value_cd_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("concept_descriptor.id"))

    @declared_attr
    def value_cd(cls) -> Mapped[Optional[ConceptDescriptor]]:
        return relationship(foreign_keys=cls.value_cd_id)  # type: ignore

    @declared_attr
    def value_pq(cls) -> Mapped[PhysicalQuantity]:
        return composite(
            mapped_column("value_pq_value", Numeric),
            mapped_column("value_pq_unit", String),
        )

    value_date: Mapped[Optional[date]]

    value_datetime: Mapped[Optional[datetime]]

    def _reset(self):
        self.value_cd = None
        if self.value_pq:
            self.value_pq.value = None
            self.value_pq.unit = None
        self.value_date = None
        self.value_datetime = None

    @property
    def value(self) -> Optional[DataValue]:
        if self.value_cd:
            return self.value_cd
        if self.value_pq and self.value_pq.unit and self.value_pq.value:
            return self.value_pq
        if self.value_date:
            return self.value_date
        if self.value_datetime:
            return self.value_datetime

    @value.setter
    def value(self, x: Optional[DataValue]):
        self._reset()
        if isinstance(x, ConceptDescriptor):
            self.value_cd = x
        if isinstance(x, PhysicalQuantity):
            self.value_pq = x
        if isinstance(x, date):
            self.value_date = x
        if isinstance(x, datetime):
            self.value_datetime = x
