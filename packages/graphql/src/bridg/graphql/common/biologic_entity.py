from __future__ import annotations

from datetime import date
from typing import List, Optional
from uuid import UUID

import strawberry

from bridg.alchemy import AdministrativeGender

from ..datatype import EntityName, EntityNameInput
from .id import ID, IDInput


@strawberry.type
class BiologicEntity:
    id: strawberry.ID
    type: str
    administrative_gender_code: Optional[AdministrativeGender]
    birth_date: Optional[date]
    death_date: Optional[date]
    death_date_estimated_indicator: Optional[bool]
    death_indicator: Optional[bool]

    identifier: List[BiologicEntityIdentifier]
    name: List[BiologicEntityName]


@strawberry.type
class BiologicEntityIdentifier(ID):
    id: strawberry.ID


@strawberry.type
class BiologicEntityName(EntityName):
    id: strawberry.ID


@strawberry.input
class BiologicEntityInput:
    id: strawberry.Maybe[UUID]
    administrative_gender_code: strawberry.Maybe[Optional[AdministrativeGender]]
    birth_date: strawberry.Maybe[Optional[date]]
    death_date: strawberry.Maybe[Optional[date]]
    death_date_estimated_indicator: strawberry.Maybe[Optional[bool]]
    death_indicator: strawberry.Maybe[Optional[bool]]

    identifier: strawberry.Maybe[List[BiologicEntityIdentifierInput]]
    name: strawberry.Maybe[List[BiologicEntityNameInput]]


@strawberry.input
class BiologicEntityIdentifierInput(IDInput):
    id: strawberry.Maybe[UUID]


@strawberry.input
class BiologicEntityNameInput(EntityNameInput):
    id: strawberry.Maybe[UUID]
