from datetime import date, datetime

from .cd import ConceptDescriptor
from .pq import PhysicalQuantity


def datavalue_json_schema_extra(jd):
    jd["oneOf"] = jd.pop("anyOf")


DataValue = ConceptDescriptor | PhysicalQuantity | datetime | date | str
