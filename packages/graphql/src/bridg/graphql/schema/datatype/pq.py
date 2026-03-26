from dataclasses import dataclass


@dataclass
class PhysicalQuantity:
    value: float | None
    unit: str | None
