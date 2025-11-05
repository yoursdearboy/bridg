from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import Field

from api.base_model import BaseModel

from ..datatypes import ConceptDescriptor, DataValue, datavalue_json_schema_extra


class PerformedObservationResult(BaseModel):
    id: UUID
    type_code: Optional[ConceptDescriptor]
    value: Optional[DataValue] = Field(json_schema_extra=datavalue_json_schema_extra)
    value_null_flavor_reason: Optional[str]
    baseline_indicator: Optional[bool]
    derived_indicator: Optional[bool]
    created_date: Optional[datetime]
    reported_date: Optional[datetime]
    comment: Optional[str]
