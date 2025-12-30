from polyfactory import Ignore

from bridg.alchemy import Material

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory


class MaterialFactory(BaseFactory[Material]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    type = "material"

    code_id = Ignore()
    code = ConceptDescriptorFactory

    form_code_id = Ignore()
    form_code = ConceptDescriptorFactory

    description = None

    performed_specimen = Ignore()
