from typing import Literal, Optional

import bridg

from ..base import BaseModel


class ConceptDescriptor(BaseModel[bridg.ConceptDescriptor]):
    _sa = bridg.ConceptDescriptor

    data_type_name: Literal["CD"] = "CD"
    code: str
    code_system: str
    display_name: Optional[str] = None

    def model_dump_sa(self, exclude=set()) -> bridg.ConceptDescriptor:
        return super().model_dump_sa(exclude=(exclude | {"data_type_name"}))
