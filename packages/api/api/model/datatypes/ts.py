from datetime import date, datetime
from typing import Literal

from ..base import BaseModel


class Date(BaseModel):
    data_type_name: Literal["TS.DATE"] = "TS.DATE"
    value: date

    def model_dump_sa(self) -> date:
        return self.value


class DateTime(BaseModel):
    data_type_name: Literal["TS.DATETIME"] = "TS.DATETIME"
    value: datetime

    def model_dump_sa(self) -> datetime:
        return self.value
