from typing import Optional
from uuid import UUID

from sqlalchemy import Enum, ForeignKey, Numeric, String
from sqlalchemy.orm import Mapped, composite, declared_attr, mapped_column, relationship

from .datatype import ConceptDescriptor, DataTypeName, DataValue, PhysicalQuantity, date, datetime


class ObservationResult:
    value_type: Mapped[Optional[DataTypeName]] = mapped_column(
        Enum(DataTypeName, values_callable=lambda x: [i.value for i in x]),
    )

    value_st: Mapped[Optional[str]]

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
        self.value_type = None
        self.value_cd = None
        if self.value_pq:
            self.value_pq.value = None
            self.value_pq.unit = None
        self.value_datetime = None
        self.value_date = None
        self.value_st = None

    @property
    def value(self) -> Optional[DataValue]:
        match self.value_type:
            case DataTypeName.CD:
                return self.value_cd
            case DataTypeName.PQ:
                return self.value_pq
            case DataTypeName.TS_DATETIME:
                return self.value_datetime
            case DataTypeName.TS_DATE:
                return self.value_date
            case DataTypeName.ST:
                return self.value_st

    @value.setter
    def value(self, x: Optional[DataValue]):
        self._reset()
        if isinstance(x, ConceptDescriptor):
            self.value_type = DataTypeName.CD
            self.value_cd = x
        if isinstance(x, PhysicalQuantity):
            self.value_type = DataTypeName.PQ
            self.value_pq = x
        if isinstance(x, datetime):
            self.value_type = DataTypeName.TS_DATETIME
            self.value_datetime = x
        if isinstance(x, date):
            self.value_type = DataTypeName.TS_DATE
            self.value_date = x
        if isinstance(x, str):
            self.value_type = DataTypeName.ST
            self.value_st = x
