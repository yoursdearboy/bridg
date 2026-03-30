from typing import Optional

import strawberry

import bridg.alchemy

from ..datatype import ConceptDescriptor


@strawberry.type
class DefinedObservationResult:
    id: strawberry.ID

    value_negation_indicator: Optional[bool]
    type_code: Optional[ConceptDescriptor]

    target_type: bridg.alchemy.DataTypeName
    target_coding_system: Optional[str]
    target_unit: Optional[str]
    derivation_expression: Optional[str]

    value: None
