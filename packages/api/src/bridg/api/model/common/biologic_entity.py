import bridg.alchemy

from .id import ID


class BiologicEntityIdentifier(ID[bridg.alchemy.BiologicEntityIdentifier]):
    _sa = bridg.alchemy.BiologicEntityIdentifier
