from typing import Optional

from sqlalchemy.orm import Mapped

from ..db import Base


class OrganizationName(Base):
    __abstract__ = True

    value: Mapped[Optional[str]]
