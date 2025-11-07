from typing import Optional

from ..base import BaseModel


class ConceptDescriptor(BaseModel):
    code: str
    code_system: str
    display_name: Optional[str] = None
