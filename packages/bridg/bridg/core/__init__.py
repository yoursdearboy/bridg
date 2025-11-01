from datetime import date, datetime

from .ad import PostalAddress, PostalAddressUse
from .cd import ConceptDescriptor, ConceptDescriptorService
from .pq import PhysicalQuantity
from .tel import TelecommunicationAddress, TelecommunicationAddressUse
from .url import URL, URLScheme

DataValue = ConceptDescriptor | PhysicalQuantity | date | datetime
