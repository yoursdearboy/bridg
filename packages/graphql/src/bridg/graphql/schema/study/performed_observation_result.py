from datetime import datetime
from typing import Optional

import strawberry

from ..datatype import ConceptDescriptor, DataValue


@strawberry.type
class PerformedObservationResult:
    id: strawberry.ID

    type_code: Optional[ConceptDescriptor]
    value_null_flavor_reason: Optional[str]

    baseline_indicator: Optional[bool]
    derived_indicator: Optional[bool]

    created_date: Optional[datetime]
    reported_date: Optional[datetime]

    comment: Optional[str]

    value: Optional[DataValue]


@strawberry.input
class PerformedObservationResultInput:
    id: strawberry.Maybe[strawberry.ID]

    type_code: strawberry.Maybe[Optional[ConceptDescriptor]]
    value_null_flavor_reason: strawberry.Maybe[Optional[str]]

    baseline_indicator: strawberry.Maybe[Optional[bool]]
    derived_indicator: strawberry.Maybe[Optional[bool]]

    created_date: strawberry.Maybe[Optional[datetime]]
    reported_date: strawberry.Maybe[Optional[datetime]]

    comment: strawberry.Maybe[Optional[str]]

    value: strawberry.Maybe[Optional[DataValue]]
