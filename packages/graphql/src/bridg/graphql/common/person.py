from __future__ import annotations

from typing import List

import strawberry

from ..datatype import PostalAddress, PostalAddressInput, TelecommunicationAddress, TelecommunicationAddressInput
from .biologic_entity import BiologicEntity, BiologicEntityFilter, BiologicEntityInput


@strawberry.type
class Person(BiologicEntity):
    postal_address: List[PersonPostalAddress]
    telecom_address: List[PersonTelecommunicationAddress]


@strawberry.type
class PersonPostalAddress(PostalAddress):
    id: strawberry.ID


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
class PersonPostalAddressInput(PostalAddressInput):
    id: strawberry.Maybe[strawberry.ID]
    person_id: strawberry.ID


@strawberry.input
class PersonTelecommunicationAddressInput(TelecommunicationAddressInput):
    id: strawberry.Maybe[strawberry.ID]
    person_id: strawberry.ID
