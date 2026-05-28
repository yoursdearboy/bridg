from __future__ import annotations

from typing import TYPE_CHECKING, Annotated, Optional

import strawberry

from ..datatype import ConceptDescriptor
from .organization import Organization
from .project import Project

if TYPE_CHECKING:
    from ..study import StudySite


@strawberry.type
class Activity:
    reason_code: Optional[ConceptDescriptor]
    comment: Optional[str]
    using_project: Optional[Project]
    context_for_study_site: Optional[Annotated[StudySite, strawberry.lazy("..study")]]
    performing_organization: Optional[Organization]


@strawberry.input
class ActivityInput:
    reason_code: strawberry.Maybe[Optional[ConceptDescriptor]]
    comment: strawberry.Maybe[Optional[str]]
    using_project_id: strawberry.Maybe[Optional[strawberry.ID]]
    context_for_study_site_id: strawberry.Maybe[Optional[strawberry.ID]]
    performing_organization_id: strawberry.Maybe[Optional[strawberry.ID]]
