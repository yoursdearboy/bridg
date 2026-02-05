from dataclasses import dataclass
from typing import Optional


@dataclass
class InstanceIdentifier:
    root: str
    extension: Optional[str]
