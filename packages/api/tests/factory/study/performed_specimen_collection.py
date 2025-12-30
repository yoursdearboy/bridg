from datetime import timezone

from polyfactory import Use

from bridg.api.model import PerformedSpecimenCollectionData, ProducedSpecimenData

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory, IntervalPointInTimeFactory


class ProducedSpecimenDataFactory(BaseFactory[ProducedSpecimenData]):
    pass


class PerformedSpecimenCollectionDataFactory(BaseFactory[PerformedSpecimenCollectionData]):
    comment = None
    reason_code = None
    date_range = IntervalPointInTimeFactory
    negation_indicator = False
    negation_reason = ConceptDescriptorFactory
    status_code = ConceptDescriptorFactory
    status_date = Use(lambda: BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc))
    context_for_study_site_id = None
    containing_epoch_id = None
    instantiated_defined_activity_id = None

    produced_specimen = Use(lambda: [])
