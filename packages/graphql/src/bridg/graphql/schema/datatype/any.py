from datetime import date, datetime
from typing import TYPE_CHECKING, Any, NewType

import bridg.alchemy

from .cd import ConceptDescriptor
from .ivl_ts import IntervalPointInTime
from .pq import PhysicalQuantity

if TYPE_CHECKING:
    DataValue = ConceptDescriptor | IntervalPointInTime | PhysicalQuantity | datetime | date | str
else:
    DataValue = NewType("DataValue", Any)


def serialize_data_value(x: DataValue) -> dict | str:
    if isinstance(x, bridg.alchemy.ConceptDescriptor):
        return ConceptDescriptor.serialize(x)  # type: ignore
    if isinstance(x, bridg.alchemy.IntervalPointInTime):
        return IntervalPointInTime.serialize(x)  # type: ignore
    if isinstance(x, bridg.alchemy.PhysicalQuantity):
        return PhysicalQuantity.serialize(x)  # type: ignore
    if isinstance(x, date):
        return x.isoformat()
    if isinstance(x, datetime):
        return x.isoformat()
    if isinstance(x, str):
        return x
    raise RuntimeError("Unknown data type")


def parse_data_value(x: dict | str) -> DataValue:
    if isinstance(x, dict) and "code" in x:
        return ConceptDescriptor(
            code=x["code"],
            code_system=x["codeSystem"],
            display_name=x.get("display_name"),
        )
    if isinstance(x, dict) and "low" and "high" in x:
        return IntervalPointInTime(
            low=datetime.fromisoformat(x["low"]),
            high=datetime.fromisoformat(x["high"]),
        )
    if isinstance(x, dict) and "unit" in x:
        return PhysicalQuantity(
            unit=x["unit"],
            value=x["value"],
        )
    if isinstance(x, str):
        try:
            dt = datetime.fromisoformat(x)
            return dt if "T" in x else dt.date()
        except ValueError:
            return x
    raise RuntimeError("Unknown data type")
