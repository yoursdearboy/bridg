from typing import TypeVar

import bridg

from .performed_activity import PerformedActivityBase

T = TypeVar("T", bound=bridg.PerformedProcedure)


class PerformedProcedure(PerformedActivityBase[T]):
    pass
