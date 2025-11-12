from typing import Literal

from ..base import BaseModel


class CharacterString(BaseModel):
    data_type_name: Literal["ST"] = "ST"
    value: str

    def model_dump_sa(self) -> str:
        return self.value
