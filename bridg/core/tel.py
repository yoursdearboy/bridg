from enum import Enum
from typing import Optional

from sqlalchemy.orm import Mapped

from .url import URL


class TelecommunicationAddressUse(Enum):
    h = "H"  # home address
    hp = "HP"  # primary home
    hv = "HV"  # vacation home
    wp = "WP"  # work place
    dir = "DIR"  # Direct
    pub = "PUB"  # Public
    bad = "BAD"  # bad address
    tmp = "TMP"  # temporary address
    as_ = "AS"  # answering service
    ec = "EC"  # emergency contact
    mc = "MC"  # mobile contact
    pg = "PG"  # pager


class TelecommunicationAddress(URL):
    __abstract__ = True

    use: Mapped[Optional[TelecommunicationAddressUse]]

    def __str__(self):
        return self.address
