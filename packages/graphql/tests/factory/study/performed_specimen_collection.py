from polyfactory import Ignore

from bridg.graphql.schema import PerformedSpecimenCollectionInput

from .performed_activity import PerformedActivityInputFactory


class PerformedSpecimenCollectionInputFactory(PerformedActivityInputFactory[PerformedSpecimenCollectionInput]):
    type = Ignore()
    produced_specimen = Ignore()
