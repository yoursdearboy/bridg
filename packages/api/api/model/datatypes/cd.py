from typing import Final, Optional

import bridg

from ..base import BaseModel


class ConceptDescriptor(BaseModel):
    data_type_name: Final[bridg.DataTypeName] = bridg.DataTypeName.PQ
    code: str
    code_system: str
    display_name: Optional[str] = None
