from __future__ import annotations

from typing import List

import strawberry

import bridg.alchemy

from ..datatype import PostalAddress, TelecommunicationAddress
from .biologic_entity import BiologicEntityFilter, BiologicEntityInput, BiologicEntityInterface


@strawberry.type
class Person(BiologicEntityInterface):
    postal_address: List[PostalAddress]
    telecom_address: List[TelecommunicationAddress]

    @staticmethod
    def is_type_of(obj, info) -> bool:
        return isinstance(obj, bridg.alchemy.Person)


@strawberry.input
class PersonFilter(BiologicEntityFilter):
    pass


@strawberry.input
class PersonInput(BiologicEntityInput):
    pass
