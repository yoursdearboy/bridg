from dataclasses import dataclass
from decimal import Decimal
from typing import Self


@dataclass
class PhysicalQuantity:
    value: Decimal | None
    unit: str | None

    @classmethod
    def serialize(cls, x: Self) -> dict:
        return {
            "value": float(x.value) if x.value else None,
            "unit": x.unit,
        }

    @classmethod
    def parse_value(cls, x: dict) -> Self:
        return cls(Decimal(x["value"]), x["unit"])
