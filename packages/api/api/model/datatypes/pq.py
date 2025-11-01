from decimal import Decimal
from typing import Literal, Optional

from ...base_model import BaseModel


class PhysicalQuantity(BaseModel):
    tag: Literal["PQ"] = "PQ"
    value: Decimal
    unit: Optional[str]
