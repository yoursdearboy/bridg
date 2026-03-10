from __future__ import annotations

from typing import List, Optional

import strawberry

from ..study import PerformedActivity
from .biologic_entity import BiologicEntity, BiologicEntityInput


@strawberry.type
class Subject:
    id: strawberry.ID
    performing_biologic_entity: Optional[BiologicEntity]
    involving_performed_activity: List[PerformedActivity]


@strawberry.input
class SubjectInput:
    id: strawberry.Maybe[strawberry.ID]
    performing_biologic_entity_id: strawberry.Maybe[strawberry.ID]
    performing_biologic_entity: strawberry.Maybe[BiologicEntityInput]
