from typing import Optional

from sqlalchemy.orm import Mapped

from ..db import Base


class Activity(Base):
    __abstract__ = True

    reason_code: Mapped[Optional[str]]
    comment: Mapped[Optional[str]]
