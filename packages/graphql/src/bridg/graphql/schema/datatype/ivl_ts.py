from dataclasses import dataclass
from datetime import datetime
from typing import Optional


@dataclass
class IntervalPointInTime:
    low: Optional[datetime]
    high: Optional[datetime]
