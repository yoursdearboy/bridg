from __future__ import annotations

from typing import TYPE_CHECKING, Annotated, Optional
from uuid import UUID

import strawberry

import bridg.alchemy

from ..common import Material, MaterialInput

if TYPE_CHECKING:
    from ...context import Context
    from ..study import PerformedSpecimenCollection


@strawberry.type
class Specimen:
    id: strawberry.ID
    performing_material: Material
    producing_performed_specimen_collection: Optional[
        Annotated[PerformedSpecimenCollection, strawberry.lazy("..study")]
    ]


@strawberry.input
class SpecimenInput:
    id: strawberry.Maybe[strawberry.ID]
    performing_material: MaterialInput


@strawberry.type
class SpecimenQuery:
    @strawberry.field(name="Specimen")
    def specimen(self, id: strawberry.ID, *, info: strawberry.Info[Context]) -> Optional[Specimen]:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.Specimen)
        query = query.filter_by(id=uuid)
        return query.one_or_none()  # type: ignore
