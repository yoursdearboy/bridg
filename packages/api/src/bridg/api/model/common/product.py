from datetime import date
from typing import Literal, Optional

import bridg.alchemy

from ..datatype import ConceptDescriptor
from .material import Material, MaterialData


class Product(Material):
    type: Literal["product"] = "product"

    type_code: Optional[ConceptDescriptor]
    lot_number_text: Optional[str]
    expiration_date: Optional[date]


class ProductData(MaterialData):
    _sa = bridg.alchemy.Product

    type: Literal["product"] = "product"

    type_code: Optional[ConceptDescriptor]
    lot_number_text: Optional[str]
    expiration_date: Optional[date]
