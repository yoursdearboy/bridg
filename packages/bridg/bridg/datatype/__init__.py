from datetime import date, datetime
from enum import Enum

from .ad import PostalAddress, PostalAddressUse
from .cd import ConceptDescriptor
from .ivl_ts import IntervalPointInTime
from .pq import PhysicalQuantity
from .tel import TelecommunicationAddress, TelecommunicationAddressUse
from .url import URL, URLScheme

DataValue = ConceptDescriptor | PhysicalQuantity | datetime | date | str


class DataTypeName(Enum):
    CD = "CD"
    IVL_TS = "IVL[TS]"
    PQ = "PQ"
    ST = "ST"
    TS_DATE = "TS.DATE"
    TS_DATETIME = "TS.DATETIME"
