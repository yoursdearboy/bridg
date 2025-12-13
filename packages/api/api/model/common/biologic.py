from typing import Literal

from .product import Product


class Biologic(Product):
    type: Literal["biologic"] = "biologic"
