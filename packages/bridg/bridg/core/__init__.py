from .ad import PostalAddress, PostalAddressUse
from .concept_descriptor import ConceptDescriptor
from .pq import PhysicalQuantity
from .tel import TelecommunicationAddress, TelecommunicationAddressUse
from .url import URL, URLScheme

DataValue = ConceptDescriptor | PhysicalQuantity
