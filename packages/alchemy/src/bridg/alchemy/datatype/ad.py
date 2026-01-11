from enum import Enum
from typing import Optional

from sqlalchemy.orm import Mapped

from ..db import Base


class PostalAddressUse(Enum):
    h = "H"  # home address
    hp = "HP"  # primary home
    hv = "HV"  # vacation home
    wp = "WP"  # work place
    dir = "DIR"  # Direct
    pub = "PUB"  # Public
    bad = "BAD"  # bad address
    tmp = "TMP"  # temporary address
    phys = "PHYS"  # physical visit address
    pst = "PST"  # postal address


class PostalAddress(Base):
    __abstract__ = True

    use: Mapped[Optional[PostalAddressUse]]
    street: Mapped[Optional[str]]
    building: Mapped[Optional[str]]
    country: Mapped[Optional[str]]
    municipality: Mapped[Optional[str]]
    state: Mapped[Optional[str]]
    zip: Mapped[Optional[str]]
