from typing import Optional

from sqlalchemy.orm import Mapped

from .en import EntityName


class TrivialName(EntityName):
    __abstract__ = True

    value: Mapped[Optional[str]]
