from typing import Optional

import bridg

from api.base_model import BaseModel


class ConceptDescriptor(BaseModel[bridg.ConceptDescriptor]):
    _sa = bridg.ConceptDescriptor

    code: str
    display_name: Optional[str]
