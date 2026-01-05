from uuid import UUID

import bridg.alchemy

from ..datatype import EntityName, EntityNameData
from .id import ID


class BiologicEntityIdentifier(ID[bridg.alchemy.BiologicEntityIdentifier]):
    _sa = bridg.alchemy.BiologicEntityIdentifier


class BiologicEntityNameData(EntityNameData[bridg.alchemy.BiologicEntityName]):
    _sa = bridg.alchemy.BiologicEntityName


class BiologicEntityName(EntityName[bridg.alchemy.BiologicEntityName]):
    id: UUID
