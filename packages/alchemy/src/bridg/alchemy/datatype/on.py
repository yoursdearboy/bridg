from typing import Optional

from sqlalchemy.orm import Mapped

from .en import EntityName


class OrganizationName(EntityName):
    __abstract__ = True


class OrganizationNameParts:
    use: Mapped[Optional[str]]
    value: Mapped[Optional[str]]
    prefix: Mapped[Optional[str]]
    suffix: Mapped[Optional[str]]
