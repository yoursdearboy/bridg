from __future__ import annotations

from typing import TYPE_CHECKING, Annotated, List, Optional

import strawberry

from .biologic_entity import BiologicEntity, BiologicEntityInput

if TYPE_CHECKING:
    from ..study import PerformedActivity


@strawberry.type
class Subject:
    id: strawberry.ID
    performing_biologic_entity: Optional[BiologicEntity]
    involving_performed_activity: List[Annotated[PerformedActivity, strawberry.lazy("..study")]]


@strawberry.input
class SubjectInput:
    id: strawberry.Maybe[strawberry.ID]
    performing_biologic_entity_id: strawberry.Maybe[strawberry.ID]
    performing_biologic_entity: strawberry.Maybe[BiologicEntityInput]
