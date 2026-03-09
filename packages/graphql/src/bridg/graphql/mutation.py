import strawberry

import bridg.alchemy

from .common import (
    BiologicEntityName,
    BiologicEntityNameInput,
    Person,
    PersonInput,
    PersonPostalAddress,
    PersonPostalAddressInput,
    PersonTelecommunicationAddress,
    PersonTelecommunicationAddressInput,
    Subject,
    SubjectInput,
)
from .context import Context


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
    @strawberry.mutation(name="PersonEntityNameCreate")
    def person_entity_name_create(
        self, input: BiologicEntityNameInput, info: strawberry.Info[Context]
    ) -> BiologicEntityName:
        session = info.context.session
        converter = info.context.converter
        en = converter.convert(input, bridg.alchemy.BiologicEntityName)
        en = session.merge(en)
        session.commit()
        return en  # type: ignore

    @strawberry.mutation(name="PersonPostalAddressCreate")
    def person_postal_address_create(
        self, input: PersonPostalAddressInput, info: strawberry.Info[Context]
    ) -> PersonPostalAddress:
        session = info.context.session
        converter = info.context.converter
        ad = converter.convert(input, bridg.alchemy.PersonPostalAddress)
        ad = session.merge(ad)
        session.commit()
        return ad  # type: ignore

    @strawberry.mutation(name="PersonTelecommunicationAddressCreate")
    def person_telecom_address_create(
        self, input: PersonTelecommunicationAddressInput, info: strawberry.Info[Context]
    ) -> PersonTelecommunicationAddress:
        session = info.context.session
        converter = info.context.converter
        tel = converter.convert(input, bridg.alchemy.PersonTelecommunicationAddress)
        tel = session.merge(tel)
        session.commit()
        return tel  # type: ignore

    @strawberry.mutation(name="SubjectCreate")
    def subject_create(self, input: SubjectInput, info: strawberry.Info[Context]) -> Subject:
        session = info.context.session
        converter = info.context.converter
        subject = converter.convert(input, bridg.alchemy.StudySubject)
        subject = session.merge(subject)
        session.commit()
        return subject  # type: ignore
