from datetime import date, datetime

import bridg

from .cd import ConceptDescriptor
from .ivl_ts import IntervalPointInTime
from .pq import PhysicalQuantity
from .st import CharacterString
from .ts import Date, DateTime

DataValue = ConceptDescriptor | IntervalPointInTime | PhysicalQuantity | DateTime | Date | CharacterString


def model_validate(x):
    match x:
        case bridg.ConceptDescriptor():
            return ConceptDescriptor.model_validate(x)
        case bridg.IntervalPointInTime():
            return IntervalPointInTime.model_validate(x)
        case bridg.PhysicalQuantity():
            return PhysicalQuantity.model_validate(x)
        case datetime():
            return DateTime(value=x)
        case date():
            return Date(value=x)
        case str():
            return CharacterString(value=x)
        case dict():
            if "data_type_name" not in x:
                raise RuntimeError("Dictionary data doesn't match DataValue type")
            return x
