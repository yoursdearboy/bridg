from __future__ import annotations

from datetime import date
from typing import TYPE_CHECKING, Annotated, List, Optional
from uuid import UUID

import strawberry

import bridg.alchemy

from ..datatype import EntityName, EntityNameInput
from .id import ID, IDInput

if TYPE_CHECKING:
    from ...context import Context
    from .subject import Subject


@strawberry.interface
class BiologicEntityInterface:
    id: strawberry.ID
    type: str
    administrative_gender_code: Optional[bridg.alchemy.AdministrativeGender]
    birth_date: Optional[date]
    death_date: Optional[date]
    death_date_estimated_indicator: Optional[bool]
    death_indicator: Optional[bool]

    identifier: List[ID]

    name: List[EntityName]

    performed_subject: List[Annotated[Subject, strawberry.lazy(".subject")]]

    @strawberry.field
    def primary_name(self) -> Optional[EntityName]:
        if len(self.name) > 0:
            return self.name[0]


@strawberry.type
class BiologicEntity(BiologicEntityInterface):
    @staticmethod
    def is_type_of(obj, _) -> bool:
        return isinstance(obj, bridg.alchemy.BiologicEntity)


@strawberry.input
class BiologicEntityFilter:
    identifier: Optional[IDInput] = None
    name: Optional[EntityNameInput] = None


@strawberry.input
class BiologicEntityInput:
    id: strawberry.Maybe[strawberry.ID]
    administrative_gender_code: strawberry.Maybe[Optional[bridg.alchemy.AdministrativeGender]]
    birth_date: strawberry.Maybe[Optional[date]]
    death_date: strawberry.Maybe[Optional[date]]
    death_date_estimated_indicator: strawberry.Maybe[Optional[bool]]
    death_indicator: strawberry.Maybe[Optional[bool]]

    identifier: strawberry.Maybe[List[IDInput]]
    name: strawberry.Maybe[List[EntityNameInput]]


@strawberry.type
class BiologicEntityMutation:
    @strawberry.mutation(name="BiologicEntityNameCreate")
    def biologic_entity_name_create(
        self, biologic_entity_id: strawberry.ID, input: EntityNameInput, info: strawberry.Info[Context]
    ) -> EntityName:
        session = info.context.session
        converter = info.context.converter
        en = converter.convert(input, bridg.alchemy.BiologicEntityName)
        en.biologic_entity_id = converter.convert(biologic_entity_id, UUID)
        en = session.merge(en)
        return en  # type: ignore

    @strawberry.mutation(name="BiologicEntityNameDelete")
    def biologic_entity_name_delete(self, id: strawberry.ID, info: strawberry.Info[Context]) -> bool:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.BiologicEntityName)
        query = query.filter_by(id=uuid)
        result = query.delete() > 0
        return result
