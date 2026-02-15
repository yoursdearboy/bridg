from __future__ import annotations

from uuid import UUID

import strawberry

from .biologic_entity import BiologicEntity, BiologicEntityInput


@strawberry.type
class Subject:
    id: strawberry.ID
    performing_biologic_entity: BiologicEntity


@strawberry.input
class SubjectInput:
    id: strawberry.Maybe[UUID]
    performing_biologic_entity_id: strawberry.Maybe[UUID]
    performing_biologic_entity: strawberry.Maybe[BiologicEntityInput]
