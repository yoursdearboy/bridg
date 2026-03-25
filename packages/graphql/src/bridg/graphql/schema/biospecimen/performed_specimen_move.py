from __future__ import annotations

from typing import TYPE_CHECKING, Optional
from uuid import UUID

import strawberry

import bridg.alchemy

from ..study import PerformedActivityInput, PerformedActivityInterface

if TYPE_CHECKING:
    from ...context import Context


@strawberry.type
class PerformedSpecimenMove(PerformedActivityInterface):
    @staticmethod
    def is_type_of(obj, _) -> bool:
        return isinstance(obj, bridg.alchemy.PerformedSpecimenMove)


@strawberry.input
class PerformedSpecimenMoveInput(PerformedActivityInput):
    pass


@strawberry.type
class PerformedSpecimenMoveQuery:
    @strawberry.field(name="PerformedSpecimenMove")
    def performed_specimen_move(
        self, id: strawberry.ID, *, info: strawberry.Info[Context]
    ) -> Optional[PerformedSpecimenMove]:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.PerformedSpecimenMove)
        query = query.filter_by(id=uuid)
        return query.one_or_none()  # type: ignore


@strawberry.type
class PerformedSpecimenMoveMutation:
    @strawberry.mutation(name="PerformedSpecimenMoveCreate")
    def performed_specimen_move_create(
        self, input: PerformedSpecimenMoveInput, info: strawberry.Info[Context]
    ) -> PerformedSpecimenMove:
        session = info.context.session
        converter = info.context.converter
        activity = converter.convert(input, bridg.alchemy.PerformedSpecimenMove)
        activity = session.merge(activity)
        return activity  # type: ignore
