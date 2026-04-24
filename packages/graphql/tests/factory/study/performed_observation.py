from polyfactory import Ignore

from bridg.graphql.schema import PerformedObservationInput

from .performed_activity import PerformedActivityInputBaseFactory


class PerformedObservationInputFactory(PerformedActivityInputBaseFactory[PerformedObservationInput]):
    type = Ignore()

    resulted_performed_observation_result = Ignore()
