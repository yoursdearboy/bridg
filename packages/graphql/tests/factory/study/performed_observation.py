from polyfactory import Ignore

from bridg.graphql.schema import PerformedObservationInput

from .performed_activity import PerformedActivityInputFactory


class PerformedObservationInputFactory(PerformedActivityInputFactory[PerformedObservationInput]):
    type = Ignore()

    resulted_performed_observation_result = Ignore()
