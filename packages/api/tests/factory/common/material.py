from polyfactory import Use

from bridg.api.model import MaterialData

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory
from .id import IDFactory


class MaterialDataFactory(BaseFactory[MaterialData]):
    id = None

    identifier = Use(lambda: IDFactory.batch(1))

    code = ConceptDescriptorFactory
    form_code = ConceptDescriptorFactory
    description = Use(BaseFactory.__faker__.text)
