from polyfactory import Ignore

from bridg.alchemy import DefinedObservation

from .defined_activity import DefinedActivityBaseFactory


class DefinedObservationFactory(DefinedActivityBaseFactory[DefinedObservation]):
    __set_as_default_factory_for_type__ = True

    produced_defined_observation_result = Ignore()
