from typing import Literal, Optional

import bridg.alchemy

from ...context import HasTerminology
from ..base import BaseModel


class ConceptDescriptor(BaseModel):
    data_type_name: Literal["CD"] = "CD"
    code: str
    code_system: str
    display_name: Optional[str] = None

    def model_dump_sa(self, exclude=set(), context: HasTerminology | None = None) -> bridg.alchemy.ConceptDescriptor:
        if context is None:
            raise RuntimeError("No context")
        return context.terminology.get_or_create(
            code=self.code,
            code_system=self.code_system,
            display_name=self.display_name,
        )
