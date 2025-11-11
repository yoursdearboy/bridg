from .cd import ConceptDescriptor
from .pq import PhysicalQuantity
from .st import CharacterString
from .ts import Date, DateTime


def datavalue_json_schema_extra(jd):
    jd["oneOf"] = jd.pop("anyOf")


DataValue = ConceptDescriptor | PhysicalQuantity | Date | DateTime | CharacterString
