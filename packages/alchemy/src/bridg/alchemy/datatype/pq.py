from __future__ import annotations

import dataclasses
from typing import Optional


@dataclasses.dataclass
class PhysicalQuantity:
    value: float | None
    unit: str | None

    def __composite_values__(self):
        return self.value, self.unit

    @staticmethod
    def _composite_factory(value: float | None, unit: str | None) -> Optional[PhysicalQuantity]:
        if value is not None:
            return PhysicalQuantity(value, unit)
