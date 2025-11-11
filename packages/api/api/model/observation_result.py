from typing import Optional

from pydantic import Field

from .datatypes import DataValue


class ObservationResult:
    value: Optional[DataValue] = Field(discriminator="data_type_name")
