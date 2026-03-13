from __future__ import annotations

from typing import List, Optional

import strawberry

from ..common import ID
from ..datatype import ConceptDescriptor


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
