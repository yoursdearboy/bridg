from typing import Optional
from uuid import UUID

import bridg
from pydantic import Field

from ..base import BaseModel
from ..datatypes import ConceptDescriptor, DataValue, datavalue_json_schema_extra


class DefinedObservationResult(BaseModel):
    id: UUID
    value: Optional[DataValue] = Field(json_schema_extra=datavalue_json_schema_extra)
    value_negation_indicator: Optional[bool]
    type_code: Optional[ConceptDescriptor]
    target_type: bridg.DataTypeName
    target_coding_system: Optional[str]
    target_unit: Optional[str]
    derivation_expression: Optional[str]
