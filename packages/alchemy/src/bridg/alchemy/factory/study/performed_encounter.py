from polyfactory import Ignore

from bridg.alchemy import PerformedEncounter

from ..datatype import ConceptDescriptorFactory
from .performed_activity import PerformedActivityBaseFactory


class PerformedEncounterFactory(PerformedActivityBaseFactory[PerformedEncounter]):
    __set_as_default_factory_for_type__ = True

    classification_code = ConceptDescriptorFactory
    departing_to_place = Ignore()
    arriving_from_place = Ignore()
