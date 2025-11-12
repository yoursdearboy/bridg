from datetime import date, datetime
from enum import Enum

from .ad import PostalAddress, PostalAddressUse
from .cd import ConceptDescriptor, ConceptDescriptorService
from .pq import PhysicalQuantity
from .tel import TelecommunicationAddress, TelecommunicationAddressUse
from .url import URL, URLScheme

DataValue = ConceptDescriptor | PhysicalQuantity | datetime | date | str


class DataTypeName(Enum):
    CD = "CD"
    PQ = "PQ"
    ST = "ST"
    TS_DATE = "TS.DATE"
    TS_DATETIME = "TS.DATETIME"
