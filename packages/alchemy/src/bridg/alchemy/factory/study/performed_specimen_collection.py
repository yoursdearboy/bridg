from polyfactory import Ignore

from bridg.alchemy import PerformedSpecimenCollection

from .performed_activity import PerformedActivityBaseFactory


class PerformedSpecimenCollectionFactory(PerformedActivityBaseFactory[PerformedSpecimenCollection]):
    __set_as_default_factory_for_type__ = True

    produced_specimen = Ignore()
