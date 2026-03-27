from polyfactory import Ignore

from bridg.graphql.schema import PerformedSpecimenMoveInput

from ..study import PerformedActivityInputFactory


class PerformedSpecimenMoveInputFactory(PerformedActivityInputFactory[PerformedSpecimenMoveInput]):
    type = Ignore()
