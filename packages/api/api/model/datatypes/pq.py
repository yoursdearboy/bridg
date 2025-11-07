from typing import Optional

from ..base import BaseModel


class PhysicalQuantity(BaseModel):
    value: float
    unit: Optional[str]
