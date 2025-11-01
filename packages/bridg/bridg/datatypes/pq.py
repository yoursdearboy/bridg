import dataclasses


@dataclasses.dataclass
class PhysicalQuantity:
    value: float | None
    unit: str | None
