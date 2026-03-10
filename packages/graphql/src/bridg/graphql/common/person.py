from __future__ import annotations

from typing import List

import strawberry

import bridg.alchemy

from ..datatype import PostalAddress, TelecommunicationAddress, TelecommunicationAddressInput
from .biologic_entity import BiologicEntityFilter, BiologicEntityInput, BiologicEntityInterface


@strawberry.type
class Person(BiologicEntityInterface):
    postal_address: List[PostalAddress]
    telecom_address: List[PersonTelecommunicationAddress]

    @staticmethod
    def is_type_of(obj, info) -> bool:
        return isinstance(obj, bridg.alchemy.Person)


@strawberry.type
class PersonTelecommunicationAddress(TelecommunicationAddress):
    id: strawberry.ID


@strawberry.input
class PersonFilter(BiologicEntityFilter):
    pass


@strawberry.input
class PersonInput(BiologicEntityInput):
    pass


@strawberry.input
class PersonTelecommunicationAddressInput(TelecommunicationAddressInput):
    id: strawberry.Maybe[strawberry.ID]
    person_id: strawberry.ID
