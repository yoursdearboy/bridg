from typing import Literal, Optional

from ..base import BaseModel


class PhysicalQuantity(BaseModel):
    data_type_name: Literal["PQ"] = "PQ"
    value: float
    unit: Optional[str]
