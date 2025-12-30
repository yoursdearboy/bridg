import bridg.alchemy

from .performed_activity import PerformedActivityBase, PerformedActivityDataBase


class PerformedProcedure[T: bridg.alchemy.PerformedProcedure](PerformedActivityBase[T]):
    pass


class PerformedProcedureData[T: bridg.alchemy.PerformedProcedure](PerformedActivityDataBase[T]):
    pass
