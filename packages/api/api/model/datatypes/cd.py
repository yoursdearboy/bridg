from typing import Optional

from ...base_model import BaseModel


class ConceptDescriptor(BaseModel):
    code: str
    code_system: str
    display_name: Optional[str] = None
