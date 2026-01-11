from typing import Optional

from sqlalchemy.orm import Mapped

from ..db import Base


class EntityName(Base):
    __abstract__ = True

    use: Mapped[Optional[str]]
    family: Mapped[Optional[str]]
    given: Mapped[Optional[str]]
    middle: Mapped[Optional[str]]
    patronymic: Mapped[Optional[str]]
    prefix: Mapped[Optional[str]]
    suffix: Mapped[Optional[str]]
