from polyfactory import Ignore

from bridg.alchemy import PerformedObservation

from .performed_activity import PerformedActivityBaseFactory


class PerformedObservationFactory(PerformedActivityBaseFactory[PerformedObservation]):
    __set_as_default_factory_for_type__ = True

    resulted_performed_observation_result = Ignore()
