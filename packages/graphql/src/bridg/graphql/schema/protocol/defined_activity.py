from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING, List, Optional
from uuid import UUID

import strawberry

import bridg.alchemy

from ..common import Activity
from ..datatype import ConceptDescriptor

if TYPE_CHECKING:
    from ...context import Context


@strawberry.interface
class DefinedActivityInterface(Activity):
    id: strawberry.ID
    name_code: Optional[ConceptDescriptor]
    category_code: Optional[ConceptDescriptor]
    subcategory_code: Optional[ConceptDescriptor]
    description: Optional[str]
    status_code: Optional[ConceptDescriptor]
    status_date: Optional[datetime]


@strawberry.type
class DefinedActivity(DefinedActivityInterface):
    @staticmethod
    def is_type_of(obj, _) -> bool:
        return isinstance(obj, bridg.alchemy.DefinedActivity)


@strawberry.type
class DefinedActivityQuery:
    @strawberry.field(name="DefinedActivityList")
    def defined_activity_list(self, *, info: strawberry.Info[Context]) -> List[DefinedActivityInterface]:
        session = info.context.session
        query = session.query(bridg.alchemy.DefinedActivity)
        return query.all()  # type: ignore

    @strawberry.field(name="DefinedActivity")
    def defined_activity(
        self, id: strawberry.ID, *, info: strawberry.Info[Context]
    ) -> Optional[DefinedActivityInterface]:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.DefinedActivity)
        query = query.filter_by(id=uuid)
        return query.one_or_none()  # type: ignore
