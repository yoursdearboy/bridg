from typing import Final

import bridg

from ..base import BaseModel


class CharacterString(BaseModel):
    data_type_name: Final[bridg.DataTypeName] = bridg.DataTypeName.ST
    value: str
