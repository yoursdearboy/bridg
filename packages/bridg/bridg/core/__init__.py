from .ad import PostalAddress, PostalAddressUse
from .concept_descriptor import ConceptDescriptor, ConceptDescriptorService
from .pq import PhysicalQuantity
from .tel import TelecommunicationAddress, TelecommunicationAddressUse
from .url import URL, URLScheme

DataValue = ConceptDescriptor | PhysicalQuantity
