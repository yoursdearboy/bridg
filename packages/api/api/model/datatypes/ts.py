from datetime import date, datetime
from typing import Final

import bridg

from ..base import BaseModel


class Date(BaseModel):
    data_type_name: Final[bridg.DataTypeName] = bridg.DataTypeName.TS_DATE
    value: date


class DateTime(BaseModel):
    data_type_name: Final[bridg.DataTypeName] = bridg.DataTypeName.TS_DATETIME
    value: datetime
