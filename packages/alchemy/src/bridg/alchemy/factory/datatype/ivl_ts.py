from datetime import timezone

from polyfactory import Use
from polyfactory.factories.dataclass_factory import DataclassFactory

from bridg.alchemy import IntervalPointInTime

from ..base import BaseFactory


class IntervalPointInTimeFactory(DataclassFactory[IntervalPointInTime]):
    __set_as_default_factory_for_type__ = True

    low = Use(lambda: BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc))
    high = Use(lambda: BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc))
