from bridg.alchemy import PerformedSpecimenMove

from ..study import PerformedActivityBaseFactory


class PerformedSpecimenMoveFactory(PerformedActivityBaseFactory[PerformedSpecimenMove]):
    __set_as_default_factory_for_type__ = True
