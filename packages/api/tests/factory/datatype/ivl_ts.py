from datetime import timezone

from polyfactory import Use

from bridg.api.model import IntervalPointInTime

from ..base import BaseFactory


class IntervalPointInTimeFactory(BaseFactory[IntervalPointInTime]):
    __set_as_default_factory_for_type__ = True

    low = Use(lambda: BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc))
    high = Use(lambda: BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc))
