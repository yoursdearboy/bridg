from polyfactory import Ignore

from bridg.graphql.schema import PerformedSpecimenMoveInput

from ..study import PerformedActivityInputBaseFactory


class PerformedSpecimenMoveInputFactory(PerformedActivityInputBaseFactory[PerformedSpecimenMoveInput]):
    type = Ignore()
