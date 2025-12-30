import bridg

from .performed_activity import PerformedActivityBase, PerformedActivityDataBase


class PerformedProcedure[T: bridg.PerformedProcedure](PerformedActivityBase[T]):
    pass


class PerformedProcedureData[T: bridg.PerformedProcedure](PerformedActivityDataBase[T]):
    pass
