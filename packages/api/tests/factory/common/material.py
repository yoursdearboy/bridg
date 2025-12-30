from polyfactory import Use

from bridg.api.model.common.material import MaterialData

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory


class MaterialDataFactory(BaseFactory[MaterialData]):
    id = None

    code = ConceptDescriptorFactory
    form_code = ConceptDescriptorFactory
    description = Use(BaseFactory.__faker__.text)
