import dataclasses
from datetime import datetime


@dataclasses.dataclass
class IntervalPointInTime:
    low: datetime | None
    high: datetime | None
