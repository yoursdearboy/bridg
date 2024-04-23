from enum import Enum
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


class Sex(Enum):
    male = "M"
    female = "F"
    unknown = "U"


class Person(Base):
    __tablename__ = "person"

    id: Mapped[int] = mapped_column(primary_key=True)
    sex = mapped_column(sa.Enum(Sex))
    birth_date = mapped_column(sa.Date())
    death_date = mapped_column(sa.Date())
    death_date_estimated_indicator = mapped_column(sa.Boolean())
    death_indicator = mapped_column(sa.Date())
