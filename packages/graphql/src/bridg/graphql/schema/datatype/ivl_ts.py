from dataclasses import dataclass
from datetime import datetime
from typing import Optional, Self


@dataclass
class IntervalPointInTime:
    low: Optional[datetime]
    high: Optional[datetime]

    @classmethod
    def serialize(cls, x: Self) -> dict:
        return {
            "low": x.low.isoformat() if x.low else None,
            "high": x.high.isoformat() if x.high else None,
        }

    @classmethod
    def parse_value(cls, x: dict) -> Self:
        low: Optional[str] = x.get("low")
        high: Optional[str] = x.get("high")
        return cls(
            low=datetime.fromisoformat(low) if low else None,
            high=datetime.fromisoformat(high) if high else None,
        )
