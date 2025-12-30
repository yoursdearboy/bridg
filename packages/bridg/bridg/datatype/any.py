from datetime import date, datetime
from enum import Enum

from .cd import ConceptDescriptor
from .pq import PhysicalQuantity

DataValue = ConceptDescriptor | PhysicalQuantity | datetime | date | str


class DataTypeName(Enum):
    CD = "CD"
    IVL_TS = "IVL[TS]"
    PQ = "PQ"
    ST = "ST"
    TS_DATE = "TS.DATE"
    TS_DATETIME = "TS.DATETIME"
