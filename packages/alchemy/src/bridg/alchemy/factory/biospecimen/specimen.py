from polyfactory import Ignore

from bridg.alchemy import Specimen

from ..base import BaseFactory
from ..common import MaterialFactory


class SpecimenFactory(BaseFactory[Specimen]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    performing_material = MaterialFactory
    producing_performed_specimen_collection = Ignore()
