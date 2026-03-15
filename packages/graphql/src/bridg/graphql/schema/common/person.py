from __future__ import annotations

from typing import TYPE_CHECKING, List, Optional
from uuid import UUID

import strawberry

import bridg.alchemy

from ..datatype import PostalAddress, PostalAddressInput, TelecommunicationAddress, TelecommunicationAddressInput
from .biologic_entity import BiologicEntityFilter, BiologicEntityInput, BiologicEntityInterface

if TYPE_CHECKING:
    from ...context import Context


@strawberry.type
class Person(BiologicEntityInterface):
    postal_address: List[PostalAddress]
    telecom_address: List[TelecommunicationAddress]

    @staticmethod
    def is_type_of(obj, _) -> bool:
        return isinstance(obj, bridg.alchemy.Person)


@strawberry.input
class PersonFilter(BiologicEntityFilter):
    pass


@strawberry.input
class PersonInput(BiologicEntityInput):
    pass


@strawberry.type
class PersonQuery:
    @strawberry.field(name="Person")
    def person(self, id: strawberry.ID, *, info: strawberry.Info[Context]) -> Optional[Person]:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.Person)
        query = query.filter_by(id=uuid)
        return query.one_or_none()  # type: ignore

    @strawberry.field(name="PersonList")
    def person_list(self, filter: Optional[PersonFilter] = None, *, info: strawberry.Info[Context]) -> List[Person]:
        session = info.context.session
        query = session.query(bridg.alchemy.Person)
        # FIXME: move to a service
        if filter:
            if filter.name and filter.name.family:
                query = query.filter(
                    bridg.alchemy.BiologicEntity.name.any(
                        bridg.alchemy.BiologicEntityName.family.ilike(f"%{filter.name.family.value}%")
                    )
                )
            # FIXME: check identifier code? or not?
            if filter.identifier:
                root = filter.identifier.identifier.root
                extension = filter.identifier.identifier.extension
                q = (bridg.alchemy.BiologicEntityIdentifier.identifier_root == root) & (  # pyright: ignore[reportAttributeAccessIssue]
                    bridg.alchemy.BiologicEntityIdentifier.identifier_extension == extension  # pyright: ignore[reportAttributeAccessIssue]
                )
                query = query.filter(bridg.alchemy.BiologicEntity.identifier.any(q))
        return query.all()  # type: ignore


@strawberry.type
class PersonMutation:
    @strawberry.mutation(name="PersonCreate")
    def person_create(self, input: PersonInput, info: strawberry.Info[Context]) -> Person:
        session = info.context.session
        converter = info.context.converter
        person = converter.convert(input, bridg.alchemy.Person)
        person = session.merge(person)
        return person  # type: ignore

    @strawberry.mutation(name="PersonPostalAddressCreate")
    def person_postal_address_create(
        self, person_id: strawberry.ID, input: PostalAddressInput, info: strawberry.Info[Context]
    ) -> PostalAddress:
        session = info.context.session
        converter = info.context.converter
        ad = converter.convert(input, bridg.alchemy.PersonPostalAddress)
        ad.person_id = converter.convert(person_id, UUID)
        ad = session.merge(ad)
        return ad  # type: ignore

    @strawberry.mutation(name="PersonPostalAddressDelete")
    def person_postal_address_delete(self, id: strawberry.ID, info: strawberry.Info[Context]) -> bool:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.PersonPostalAddress)
        query = query.filter_by(id=uuid)
        result = query.delete() > 0
        return result

    @strawberry.mutation(name="PersonTelecommunicationAddressCreate")
    def person_telecom_address_create(
        self, person_id: strawberry.ID, input: TelecommunicationAddressInput, info: strawberry.Info[Context]
    ) -> TelecommunicationAddress:
        session = info.context.session
        converter = info.context.converter
        tel = converter.convert(input, bridg.alchemy.PersonTelecommunicationAddress)
        tel.person_id = converter.convert(person_id, UUID)
        tel = session.merge(tel)
        return tel  # type: ignore

    @strawberry.mutation(name="PersonTelecommunicationAddressDelete")
    def person_telecom_address_delete(self, id: strawberry.ID, info: strawberry.Info[Context]) -> bool:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.PersonTelecommunicationAddress)
        query = query.filter_by(id=uuid)
        result = query.delete() > 0
        return result
