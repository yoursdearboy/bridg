from polyfactory import Ignore

from bridg.graphql.schema import PerformedEncounterInput

from .performed_activity import PerformedActivityInputBaseFactory


class PerformedEncounterInputFactory(PerformedActivityInputBaseFactory[PerformedEncounterInput]):
    type = Ignore()
    departing_to_place_id = None
    arriving_from_place_id = None
