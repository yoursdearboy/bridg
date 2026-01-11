from typing import Optional

import bridg.alchemy

from ..base import BaseModel


class InstanceIdentifier(BaseModel):
    root: str
    extension: Optional[str]

    def model_dump_sa(self, context=None) -> bridg.alchemy.InstanceIdentifier:
        return bridg.alchemy.InstanceIdentifier(bridg.alchemy.UniqueIdentifierString(self.root), self.extension)
