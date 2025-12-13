from __future__ import annotations

from .material import Material


class Product(Material):
    __mapper_args__ = {"polymorphic_identity": "product"}
