from polyfactory import Ignore

from bridg.graphql.schema import PerformedSpecimenCollectionInput

from .performed_activity import PerformedActivityInputBaseFactory


class PerformedSpecimenCollectionInputFactory(PerformedActivityInputBaseFactory[PerformedSpecimenCollectionInput]):
    type = Ignore()
    produced_specimen = Ignore()
