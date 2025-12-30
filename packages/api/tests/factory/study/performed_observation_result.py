from datetime import timezone

from polyfactory import Ignore, Use

from api.model import PerformedObservationResultData

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory


class PerformedObservationResultDataFactory(BaseFactory[PerformedObservationResultData]):
    id = Ignore()
    type_code = ConceptDescriptorFactory
    value_null_flavor_reason = None
    baseline_indicator = False
    derived_indicator = False
    created_date = Use(lambda: BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc))
    reported_date = Use(lambda: BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc))
    comment = None
    # value
