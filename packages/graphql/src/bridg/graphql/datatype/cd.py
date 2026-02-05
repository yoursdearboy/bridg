from dataclasses import dataclass
from typing import Optional


@dataclass
class ConceptDescriptor:
    code: str
    code_system: str
    display_name: Optional[str]
