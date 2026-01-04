from typing import Annotated, Optional

from pydantic import BeforeValidator, Field

from .datatype import DataValue, model_validate


class ObservationResult:
    value: Annotated[
        Optional[DataValue],
        BeforeValidator(model_validate),
        Field(discriminator="data_type_name"),
    ]
