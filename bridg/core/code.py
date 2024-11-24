import re
from typing import Optional

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, declared_attr, mapped_column

from ..db import Base

camel_to_snake_case_pattern = re.compile(r"(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])")


def camel_to_snake_case(x):
    return camel_to_snake_case_pattern.sub("_", x).lower()


class Code(Base):
    __abstract__ = True

    @declared_attr.directive
    def __tablename__(cls) -> str:
        return camel_to_snake_case(cls.__qualname__.replace(".", ""))

    @declared_attr.directive
    def __table_args__(cls):
        return (UniqueConstraint("code"),)

    id: Mapped[int] = mapped_column(primary_key=True)

    code: Mapped[Optional[str]]
    display_name: Mapped[Optional[str]]

    def __str__(self):
        return self.display_name


def code_column(cls):
    fk = f"{cls.__tablename__}.id"
    fk = ForeignKey(fk)
    return mapped_column(fk)
