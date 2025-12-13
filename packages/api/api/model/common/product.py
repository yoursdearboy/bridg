from datetime import date
from typing import Literal, Optional

from ..datatypes import ConceptDescriptor
from .material import Material


class Product(Material):
    type: Literal["product"] = "product"

    type_code: Optional[ConceptDescriptor]
    lot_number_text: Optional[str]
    expiration_date: Optional[date]
