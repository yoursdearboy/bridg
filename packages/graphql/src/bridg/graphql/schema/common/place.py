from __future__ import annotations

from typing import TYPE_CHECKING, List, Optional

import strawberry

import bridg.alchemy

from ..common import ID
from ..datatype import ConceptDescriptor

if TYPE_CHECKING:
    from ...context import Context


@strawberry.type
class Place:
    id: strawberry.ID
    identifier: List[ID]
    identifier_code: Optional[ConceptDescriptor]
    name: List[PlaceName]
    type_code: Optional[ConceptDescriptor]
    actual_indicator: bool

    @strawberry.field
    def primary_name(self) -> Optional[PlaceName]:
        if len(self.name) > 0:
            return self.name[0]


@strawberry.type
class PlaceName:
    id: strawberry.ID
    value: Optional[str]


@strawberry.input
class PlaceFilter:
    type_code: Optional[ConceptDescriptor] = None


@strawberry.type
class PlaceQuery:
    @strawberry.field(name="PlaceList")
    def place_list(self, filter: Optional[PlaceFilter] = None, *, info: strawberry.Info[Context]) -> List[Place]:
        session = info.context.session
        query = session.query(bridg.alchemy.Place)
        if filter and (cd := filter.type_code):
            query = query.filter(bridg.alchemy.Place.type_code.has(code=cd.code, code_system=cd.code_system))
        return query.all()  # type: ignore
