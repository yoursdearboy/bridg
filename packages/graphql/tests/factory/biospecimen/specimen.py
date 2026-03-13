from bridg.graphql.schema import SpecimenInput

from ..base import BaseFactory
from ..common import MaterialInputFactory


class SpecimenInputFactory(BaseFactory[SpecimenInput]):
    __check_model__ = False

    id = None
    performing_material = MaterialInputFactory
