from typing import Literal

import bridg.alchemy

from .product import Product, ProductData


class Biologic(Product):
    type: Literal["biologic"] = "biologic"


class BiologicData(ProductData):
    _sa = bridg.alchemy.Biologic

    type: Literal["biologic"] = "biologic"
