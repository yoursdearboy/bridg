from polyfactory import Ignore

from bridg.graphql.schema import PerformedEncounterInput

from .performed_activity import PerformedActivityInputFactory


class PerformedEncounterInputFactory(PerformedActivityInputFactory[PerformedEncounterInput]):
    type = Ignore()
    departing_to_place_id = None
    arriving_from_place_id = None
