from polyfactory import Use

from bridg.graphql.schema import MaterialInput

from ..base import BaseFactory
from ..datatype import PhysicalQuantityFactory
from ..maybe import make_some


class MaterialInputFactory(BaseFactory[MaterialInput]):
    id = None
    type = "material"
    identifier = None
    # code
    # form_code
    description = Use(make_some(BaseFactory.__faker__.text))
    quantity = PhysicalQuantityFactory
