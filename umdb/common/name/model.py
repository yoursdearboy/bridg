import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import column

from umdb.db import Base


class Name(Base):
    __tablename__ = "biologic_entity_name"

    id: Mapped[int] = mapped_column(primary_key=True)

    use = mapped_column(sa.String())
    family = mapped_column(sa.String())
    given = mapped_column(sa.String())
    middle = mapped_column(sa.String())
    patronymic = mapped_column(sa.String())
    prefix = mapped_column(sa.String())
    suffix = mapped_column(sa.String())

    biologic_entity_id: Mapped[int] = mapped_column(sa.ForeignKey("biologic_entity.id"))
    biologic_entity: Mapped["BiologicEntity"] = relationship(back_populates="names")

    @property
    def full(self):
        parts = [self.prefix, self.given, self.middle, self.family, self.suffix]
        parts = [p for p in parts if p]
        s = " ".join(parts)
        s = "Anonymous" if s == "" else s
        return s

    def __str__(self):
        return self.full


name_index = (
    sa.func.row_number()
    .over(partition_by=Name.biologic_entity_id, order_by=sa.desc(Name.use))
    .label("i")
)

indexed_names = sa.select(Name, name_index).subquery()
primary_names = sa.select(indexed_names).filter(column(name_index.key) == 1).subquery()
