from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING, Annotated, List, Optional
from uuid import UUID

import strawberry

import bridg.alchemy

from .subject import SubjectInput, SubjectInterface

if TYPE_CHECKING:
    from ...context import Context
    from ..study import StudySiteProtocolVersionRelationship, StudySiteProtocolVersionRelationshipInput


@strawberry.type
class StudySubject(SubjectInterface):
    status: Optional[bridg.alchemy.Status]
    status_date: Optional[datetime]
    assigned_study_site_protocol_version_relationship: List[
        Annotated[StudySiteProtocolVersionRelationship, strawberry.lazy("..study")]
    ]

    @staticmethod
    def is_type_of(obj, _) -> bool:
        return isinstance(obj, bridg.alchemy.StudySubject)


@strawberry.input
class StudySubjectFilter:
    # TODO: make deep, not flat?
    study_protocol_version_id: Optional[strawberry.ID]


@strawberry.input
class StudySubjectCreateInput(SubjectInput):
    status: strawberry.Maybe[Optional[bridg.alchemy.Status]]
    status_date: strawberry.Maybe[Optional[datetime]]
    assigned_study_site_protocol_version_relationship: List[
        Annotated[
            StudySiteProtocolVersionRelationshipInput,
            strawberry.lazy("..study"),
        ]
    ]


@strawberry.input
class StudySubjectUpdateInput(SubjectInput):
    status: strawberry.Maybe[Optional[bridg.alchemy.Status]]
    status_date: strawberry.Maybe[Optional[datetime]]


@strawberry.type
class StudySubjectQuery:
    @strawberry.field(name="StudySubject")
    def study_subject(self, id: strawberry.ID, *, info: strawberry.Info[Context]) -> Optional[StudySubject]:
        converter = info.context.converter
        session = info.context.session
        uuid = converter.convert(id, UUID)
        query = session.query(bridg.alchemy.StudySubject)
        query = query.filter_by(id=uuid)
        return query.one_or_none()  # type: ignore

    @strawberry.field(name="StudySubjectList")
    def study_subject_list(
        self, filter: Optional[StudySubjectFilter] = None, *, info: strawberry.Info[Context]
    ) -> List[StudySubject]:
        session = info.context.session
        converter = info.context.converter
        query = session.query(bridg.alchemy.StudySubject)
        if filter and filter.study_protocol_version_id:
            query = (
                query.join(bridg.alchemy.StudySubject.assigned_study_subject_protocol_version_relationship)
                .join(
                    bridg.alchemy.StudySubjectProtocolVersionRelationship.assigning_study_site_protocol_version_relationship
                )
                .filter(
                    bridg.alchemy.StudySiteProtocolVersionRelationship.executed_study_protocol_version_id
                    == converter.convert(filter.study_protocol_version_id, UUID)
                )
            )
        return query.all()  # type: ignore


@strawberry.type
class StudySubjectMutation:
    @strawberry.mutation(name="StudySubjectCreate")
    def study_subject_create(self, input: StudySubjectCreateInput, info: strawberry.Info[Context]) -> StudySubject:
        session = info.context.session
        converter = info.context.converter
        subject = converter.convert(input, bridg.alchemy.StudySubject)
        subject = session.merge(subject)
        return subject  # type: ignore

    @strawberry.mutation(name="StudySubjectUpdate")
    def study_subject_update(self, input: StudySubjectUpdateInput, info: strawberry.Info[Context]) -> StudySubject:
        session = info.context.session
        converter = info.context.converter
        subject = converter.convert(input, bridg.alchemy.StudySubject)
        subject = session.merge(subject)
        return subject  # type: ignore
