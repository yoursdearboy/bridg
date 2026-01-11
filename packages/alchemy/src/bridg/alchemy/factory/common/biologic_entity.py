from polyfactory import Ignore

from bridg.alchemy import BiologicEntityIdentifier, BiologicEntityName

from ..datatype import EntityNameFactory
from .id import IDFactory


class BiologicEntityIdentifierFactory(IDFactory[BiologicEntityIdentifier]):
    id = Ignore()
    biologic_entity_id = Ignore()
    biologic_entity = Ignore()


class BiologicEntityNameFactory(EntityNameFactory[BiologicEntityName]):
    id = Ignore()
    biologic_entity_id = Ignore()
    biologic_entity = Ignore()
