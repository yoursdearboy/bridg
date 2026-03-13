from bridg.graphql.schema import PerformedEncounterInput

from .performed_activity import PerformedActivityInputFactory


class PerformedEncounterInputFactory(PerformedActivityInputFactory[PerformedEncounterInput]):
    departing_to_place_id = None
    arriving_from_place_id = None
