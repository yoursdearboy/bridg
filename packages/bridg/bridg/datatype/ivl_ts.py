import dataclasses
from datetime import datetime


@dataclasses.dataclass
class IntervalPointInTime:
    low: datetime | None
    high: datetime | None

    def __composite_values__(self):
        return self.low, self.high
