from __future__ import annotations

from datetime import date
from typing import List, Optional

import strawberry

import bridg.alchemy

from ..datatype import EntityName, EntityNameInput
from .id import ID, IDInput


@strawberry.interface
class BiologicEntityInterface:
    id: strawberry.ID
    type: str
    administrative_gender_code: Optional[bridg.alchemy.AdministrativeGender]
    birth_date: Optional[date]
    death_date: Optional[date]
    death_date_estimated_indicator: Optional[bool]
    death_indicator: Optional[bool]

    identifier: List[BiologicEntityIdentifier]
    name: List[EntityName]

    @strawberry.field
    def primary_name(self) -> Optional[EntityName]:
        if len(self.name) > 0:
            return self.name[0]


@strawberry.type
class BiologicEntity(BiologicEntityInterface):
    @staticmethod
    def is_type_of(obj, info) -> bool:
        return isinstance(obj, bridg.alchemy.BiologicEntity)


@strawberry.type
class BiologicEntityIdentifier(ID):
    id: strawberry.ID


@strawberry.input
class BiologicEntityFilter:
    identifier: Optional[IDInput] = None
    name: Optional[EntityNameInput] = None


@strawberry.input
class BiologicEntityInput:
    id: strawberry.Maybe[strawberry.ID]
    administrative_gender_code: strawberry.Maybe[Optional[bridg.alchemy.AdministrativeGender]]
    birth_date: strawberry.Maybe[Optional[date]]
    death_date: strawberry.Maybe[Optional[date]]
    death_date_estimated_indicator: strawberry.Maybe[Optional[bool]]
    death_indicator: strawberry.Maybe[Optional[bool]]

    identifier: strawberry.Maybe[List[BiologicEntityIdentifierInput]]
    name: strawberry.Maybe[List[EntityNameInput]]


@strawberry.input
class BiologicEntityIdentifierInput(IDInput):
    id: strawberry.Maybe[strawberry.ID]
