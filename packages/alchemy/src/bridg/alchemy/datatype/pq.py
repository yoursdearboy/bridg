import dataclasses


@dataclasses.dataclass
class PhysicalQuantity:
    value: float | None
    unit: str | None

    def __composite_values__(self):
        return self.value, self.unit
