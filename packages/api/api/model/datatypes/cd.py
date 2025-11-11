from typing import Literal, Optional

from ..base import BaseModel


class ConceptDescriptor(BaseModel):
    data_type_name: Literal["CD"] = "CD"
    code: str
    code_system: str
    display_name: Optional[str] = None
