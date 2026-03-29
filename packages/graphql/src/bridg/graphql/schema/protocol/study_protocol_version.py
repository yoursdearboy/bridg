from __future__ import annotations

from typing import TYPE_CHECKING, Annotated, List, Optional
from uuid import UUID

import strawberry

import bridg.alchemy

from .epoch import Epoch

if TYPE_CHECKING:
    from ...context import Context
    from ..study import StudySite


@strawberry.type
class StudyProtocolVersion:
    id: strawberry.ID
    acronym: Optional[str]
    executing_study_site: List[Annotated[StudySite, strawberry.lazy("..study")]]
    subdividing_epoch: List[Epoch]


@strawberry.type
class StudyProtocolVersionQuery:
    @strawberry.field(name="StudyProtocolVersionList")
    def study_protocol_version_list(self, *, info: strawberry.Info[Context]) -> List[StudyProtocolVersion]:
        session = info.context.session
        query = session.query(bridg.alchemy.StudyProtocolVersion)
        return query.all()  # type: ignore

    @strawberry.field(name="StudyProtocolVersion")
    def study_protocol_version(
        self, id: strawberry.ID, *, info: strawberry.Info[Context]
    ) -> Optional[StudyProtocolVersion]:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.StudyProtocolVersion)
        query = query.filter_by(id=uuid)
        return query.one_or_none()  # type: ignore
