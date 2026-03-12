from __future__ import annotations

from typing import TYPE_CHECKING, Annotated, Optional

import strawberry

from ..common import Material

if TYPE_CHECKING:
    from ..study import PerformedSpecimenCollection


@strawberry.type
class Specimen:
    id: strawberry.ID
    performing_material: Material
    producing_performed_specimen_collection: Optional[
        Annotated[PerformedSpecimenCollection, strawberry.lazy("..study")]
    ]
