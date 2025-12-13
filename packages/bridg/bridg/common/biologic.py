from __future__ import annotations

from .product import Product


class Biologic(Product):
    """
    DEFINITION:
    A substance made from a living organism or thing it produces.

    EXAMPLE(S):
    virus, therapeutic serum, toxin, antitoxin, vaccine, blood, blood component or derivative, allergenic product, analogous product

    OTHER NAME(S):

    NOTE(S):
    """

    __mapper_args__ = {"polymorphic_identity": "biologic"}
