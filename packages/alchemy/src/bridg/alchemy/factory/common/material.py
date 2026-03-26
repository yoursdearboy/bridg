from polyfactory import Ignore, Use

from bridg.alchemy import Material, MaterialIdentifier

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory
from .id import IDFactory


class MaterialIdentifierFactory(IDFactory[MaterialIdentifier]):
    id = Ignore()
    material_id = Ignore()
    material = Ignore()


class MaterialFactory(BaseFactory[Material]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    type = "material"

    identifier = Use(lambda: MaterialIdentifierFactory.batch(1))

    code_id = Ignore()
    code = ConceptDescriptorFactory

    form_code_id = Ignore()
    form_code = ConceptDescriptorFactory

    description = None

    quantity_value = Use(lambda: BaseFactory.__faker__.random_number(2))
    quantity_unit = Use(lambda: BaseFactory.__random__.choice(["s", "m", "kg", "m2", "m3", "10^9/l"]))

    performed_specimen = Ignore()
