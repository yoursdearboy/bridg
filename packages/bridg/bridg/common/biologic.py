from __future__ import annotations

from .product import Product


class Biologic(Product):
    __mapper_args__ = {"polymorphic_identity": "biologic"}
