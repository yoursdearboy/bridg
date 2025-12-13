from datetime import datetime
from typing import Literal, Optional

import bridg

from ..base import BaseModel


class IntervalPointInTime(BaseModel):
    data_type_name: Literal["IVL[TS]"] = "IVL[TS]"
    low: Optional[datetime]
    high: Optional[datetime]

    def model_dump_sa(self, context=None) -> bridg.IntervalPointInTime:
        return bridg.IntervalPointInTime(self.low, self.high)
