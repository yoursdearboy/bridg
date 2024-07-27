from typing import Optional

import sqlalchemy as sa
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import column

from umdb.db import Base


class Name(Base):
    __tablename__ = "biologic_entity_name"

    id: Mapped[int] = mapped_column(primary_key=True)

    use: Mapped[Optional[str]]
    family: Mapped[Optional[str]]
    given: Mapped[Optional[str]]
    middle: Mapped[Optional[str]]
    patronymic: Mapped[Optional[str]]
    prefix: Mapped[Optional[str]]
    suffix: Mapped[Optional[str]]

    biologic_entity_id: Mapped[int] = mapped_column(ForeignKey("biologic_entity.id"))
    biologic_entity: Mapped["BiologicEntity"] = relationship(back_populates="name")

    @property
    def full(self):
        parts = [self.prefix, self.given, self.middle, self.family, self.suffix]
        parts = [p for p in parts if p]
        s = " ".join(parts)
        s = "Anonymous" if s == "" else s
        return s


name_index = (
    sa.func.row_number()
    .over(partition_by=Name.biologic_entity_id, order_by=sa.desc(Name.use))
    .label("i")
)

indexed_names = sa.select(Name, name_index).subquery()
primary_names = sa.select(indexed_names).filter(column(name_index.key) == 1).subquery()
