from typing import Final, Optional

import bridg

from ..base import BaseModel


class PhysicalQuantity(BaseModel):
    data_type_name: Final[bridg.DataTypeName] = bridg.DataTypeName.PQ
    value: float
    unit: Optional[str]
