from typing import Literal, Optional

import bridg

from ..base import BaseModel


class PhysicalQuantity(BaseModel):
    data_type_name: Literal["PQ"] = "PQ"
    value: float
    unit: Optional[str]

    def model_dump_sa(self, context=None) -> bridg.PhysicalQuantity:
        return bridg.PhysicalQuantity(self.value, self.unit)
