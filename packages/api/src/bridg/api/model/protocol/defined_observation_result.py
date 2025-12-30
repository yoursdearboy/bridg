from typing import Optional
from uuid import UUID

import bridg.alchemy

from ..base import BaseModel
from ..datatypes import ConceptDescriptor
from ..observation_result import ObservationResult


class DefinedObservationResult(ObservationResult, BaseModel):
    id: UUID
    value_negation_indicator: Optional[bool]
    type_code: Optional[ConceptDescriptor]
    target_type: bridg.alchemy.DataTypeName
    target_coding_system: Optional[str]
    target_unit: Optional[str]
    derivation_expression: Optional[str]
