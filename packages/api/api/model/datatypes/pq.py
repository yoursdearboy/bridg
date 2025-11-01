from typing import Optional

from pydantic import BaseModel


class PhysicalQuantity(BaseModel):
    value: str
    unit: Optional[str]
