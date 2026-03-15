from __future__ import annotations

from typing import TYPE_CHECKING, List, Optional
from uuid import UUID

import strawberry

import bridg.alchemy

from ..biospecimen import Specimen, SpecimenInput
from .performed_activity import PerformedActivityInput, PerformedActivityInterface

if TYPE_CHECKING:
    from ...context import Context


@strawberry.type
class PerformedSpecimenCollection(PerformedActivityInterface):
    produced_specimen: List[Specimen]

    @staticmethod
    def is_type_of(obj, _) -> bool:
        return isinstance(obj, bridg.alchemy.PerformedSpecimenCollection)


@strawberry.input
class PerformedSpecimenCollectionInput(PerformedActivityInput):
    produced_specimen: strawberry.Maybe[List[SpecimenInput]]


@strawberry.type
class PerformedSpecimenCollectionQuery:
    @strawberry.field(name="PerformedSpecimenCollection")
    def performed_specimen_collection(
        self, id: strawberry.ID, *, info: strawberry.Info[Context]
    ) -> Optional[PerformedSpecimenCollection]:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.PerformedSpecimenCollection)
        query = query.filter_by(id=uuid)
        return query.one_or_none()  # type: ignore


@strawberry.type
class PerformedSpecimenCollectionMutation:
    @strawberry.mutation(name="PerformedSpecimenCollectionCreate")
    def performed_specimen_collection_create(
        self, input: PerformedSpecimenCollectionInput, info: strawberry.Info[Context]
    ) -> PerformedSpecimenCollection:
        session = info.context.session
        converter = info.context.converter
        activity = converter.convert(input, bridg.alchemy.PerformedSpecimenCollection)
        activity = session.merge(activity)
        return activity  # type: ignore
