from datetime import date, datetime

import bridg

from .cd import ConceptDescriptor
from .pq import PhysicalQuantity
from .st import CharacterString
from .ts import Date, DateTime

DataValue = ConceptDescriptor | PhysicalQuantity | Date | DateTime | CharacterString


def model_validate(x):
    match x:
        case bridg.ConceptDescriptor():
            return ConceptDescriptor.model_validate(x)
        case bridg.PhysicalQuantity():
            return PhysicalQuantity.model_validate(x)
        case date():
            return Date(value=x)
        case datetime():
            return DateTime(value=x)
        case str():
            return CharacterString(value=x)
        case dict():
            return x
