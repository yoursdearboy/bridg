from typing import Optional
from uuid import UUID

from pydantic import Field

from api.base_model import BaseModel

from ..datatypes import ConceptDescriptor, DataValue, datavalue_json_schema_extra


class DefinedObservationResult(BaseModel):
    id: UUID
    value: Optional[DataValue] = Field(json_schema_extra=datavalue_json_schema_extra)
    value_negation_indicator: Optional[bool]
    type_code: Optional[ConceptDescriptor]
    derivation_expression: Optional[str]
