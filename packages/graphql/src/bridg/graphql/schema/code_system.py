from __future__ import annotations

from typing import TYPE_CHECKING, List

import strawberry

import bridg.alchemy

from .datatype import ConceptDescriptor

if TYPE_CHECKING:
    from ..context import Context


@strawberry.type
class CodeSystemQuery:
    @strawberry.field(name="CodeSystem")
    def code_system(self, code_system: str, *, info: strawberry.Info[Context]) -> List[ConceptDescriptor]:
        session = info.context.session
        query = session.query(bridg.alchemy.ConceptDescriptor)
        query = query.filter_by(code_system=code_system)
        return query.all()  # type: ignore
