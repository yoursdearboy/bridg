from typing import Literal, Optional

from ...base_model import BaseModel


class ConceptDescriptor(BaseModel):
    tag: Literal["CD"] = "CD"
    code: str
    code_system: str
    display_name: Optional[str] = None
