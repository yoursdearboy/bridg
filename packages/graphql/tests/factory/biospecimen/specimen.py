from bridg.graphql.schema import SpecimenInput

from ..base import BaseFactory
from ..common import MaterialInputFactory


class SpecimenInputFactory(BaseFactory[SpecimenInput]):
    id = None
    performing_material = MaterialInputFactory
