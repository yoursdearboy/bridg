from typing import Optional

from ...base_model import BaseModel


class PhysicalQuantity(BaseModel):
    value: float
    unit: Optional[str]
