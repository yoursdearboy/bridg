from polyfactory import Ignore, Use

from bridg.alchemy import Place, PlaceIdentifier, PlaceName

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory
from .id import IDFactory


class PlaceFactory(BaseFactory[Place]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    identifier = Use(lambda: PlaceIdentifierFactory.batch(1))
    name = Use(lambda: PlaceNameFactory.batch(1))
    type_code = ConceptDescriptorFactory
    actual_indicator = True


class PlaceIdentifierFactory(IDFactory[PlaceIdentifier]):
    id = Ignore()
    place_id = Ignore()
    place = Ignore()


class PlaceNameFactory(BaseFactory[PlaceName]):
    id = Ignore()
    place_id = Ignore()
    place = Ignore()
    value = Use(BaseFactory.__faker__.word)
