import dataclasses
from typing import Optional

from .uid import UniqueIdentifierString


@dataclasses.dataclass
class InstanceIdentifier:
    root: UniqueIdentifierString
    extension: Optional[str]

    def __composite_values__(self):
        return self.root, self.extension
