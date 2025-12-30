from typing import Literal

import bridg

from .product import Product, ProductData


class Biologic(Product):
    type: Literal["biologic"] = "biologic"


class BiologicData(ProductData):
    _sa = bridg.Biologic

    type: Literal["biologic"] = "biologic"
