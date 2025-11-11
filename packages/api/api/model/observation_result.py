from datetime import date, datetime
from typing import Optional

import bridg
from pydantic import Field, computed_field

from .datatypes import ConceptDescriptor, DataValue, PhysicalQuantity, datavalue_json_schema_extra


class ObservationResult:
    value: Optional[DataValue] = Field(json_schema_extra=datavalue_json_schema_extra)

    @computed_field
    @property
    def value_type(self) -> Optional[bridg.DataTypeName]:
        match self.value:
            case ConceptDescriptor():
                return bridg.DataTypeName.CD
            case PhysicalQuantity():
                return bridg.DataTypeName.PQ
            case datetime():
                return bridg.DataTypeName.TS_DATE
            case date():
                return bridg.DataTypeName.TS_DATETIME
            case str():
                return bridg.DataTypeName.ST
