from __future__ import annotations

from datetime import date
from typing import List, Optional

import strawberry

from bridg.alchemy import AdministrativeGender

from ..datatype import EntityName
from .id import ID


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
