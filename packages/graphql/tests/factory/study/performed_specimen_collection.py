from polyfactory import Ignore

from bridg.graphql.schema import PerformedSpecimenCollectionInput

from .performed_activity import PerformedActivityInputFactory


class PerformedSpecimenCollectionInputFactory(PerformedActivityInputFactory[PerformedSpecimenCollectionInput]):
    produced_specimen = Ignore()
