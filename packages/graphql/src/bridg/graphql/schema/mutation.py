from __future__ import annotations

from typing import TYPE_CHECKING
from uuid import UUID

import strawberry

import bridg.alchemy

from . import (
    EntityName,
    EntityNameInput,
    Person,
    PersonInput,
    PostalAddress,
    PostalAddressInput,
    Subject,
    SubjectInput,
    TelecommunicationAddress,
    TelecommunicationAddressInput,
)

if TYPE_CHECKING:
    from ..context import Context


@strawberry.type
class Mutation:
    @strawberry.mutation(name="PersonCreate")
    def person_create(self, input: PersonInput, info: strawberry.Info[Context]) -> Person:
        session = info.context.session
        converter = info.context.converter
        person = converter.convert(input, bridg.alchemy.Person)
        person = session.merge(person)
        session.commit()
        return person  # type: ignore

    # FIXME: rename
    @strawberry.mutation(name="BiologicEntityNameCreate")
    def person_entity_name_create(
        self, biologic_entity_id: strawberry.ID, input: EntityNameInput, info: strawberry.Info[Context]
    ) -> EntityName:
        session = info.context.session
        converter = info.context.converter
        en = converter.convert(input, bridg.alchemy.BiologicEntityName)
        en.biologic_entity_id = converter.convert(biologic_entity_id, UUID)
        en = session.merge(en)
        session.commit()
        return en  # type: ignore

    @strawberry.mutation(name="PersonPostalAddressCreate")
    def person_postal_address_create(
        self, person_id: strawberry.ID, input: PostalAddressInput, info: strawberry.Info[Context]
    ) -> PostalAddress:
        session = info.context.session
        converter = info.context.converter
        ad = converter.convert(input, bridg.alchemy.PersonPostalAddress)
        ad.person_id = converter.convert(person_id, UUID)
        ad = session.merge(ad)
        session.commit()
        return ad  # type: ignore

    @strawberry.mutation(name="PersonTelecommunicationAddressCreate")
    def person_telecom_address_create(
        self, person_id: strawberry.ID, input: TelecommunicationAddressInput, info: strawberry.Info[Context]
    ) -> TelecommunicationAddress:
        session = info.context.session
        converter = info.context.converter
        tel = converter.convert(input, bridg.alchemy.PersonTelecommunicationAddress)
        tel.person_id = converter.convert(person_id, UUID)
        tel = session.merge(tel)
        session.commit()
        return tel  # type: ignore

    @strawberry.mutation(name="SubjectCreate")
    def subject_create(self, input: SubjectInput, info: strawberry.Info[Context]) -> Subject:
        session = info.context.session
        converter = info.context.converter
        subject = converter.convert(input, bridg.alchemy.Subject)
        subject = session.merge(subject)
        session.commit()
        return subject  # type: ignore
