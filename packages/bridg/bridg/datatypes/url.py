from enum import Enum
from typing import Optional

from sqlalchemy.orm import Mapped

from ..db import Base


class URLScheme(Enum):
    ftp = "ftp"
    http = "http"
    mailto = "mailto"
    tel = "tel"


class URL(Base):
    __abstract__ = True

    scheme: Mapped[Optional[URLScheme]]
    address: Mapped[Optional[str]]
