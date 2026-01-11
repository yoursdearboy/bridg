from typing import Optional

import bridg.alchemy

from ..base import BaseModel
from ..datatype import ConceptDescriptor, InstanceIdentifier


class ID[T: bridg.alchemy.ID](BaseModel[T]):
    identifier: InstanceIdentifier
    identifier_type_code: Optional[ConceptDescriptor]
