import strawberry

import bridg.alchemy

from .common import Person, PersonInput, Subject, SubjectInput
from .context import Context


@strawberry.type
class Mutation:
    @strawberry.mutation
    def person(self, input: PersonInput, info: strawberry.Info[Context]) -> Person:
        session = info.context.session
        converter = info.context.converter
        person = converter.convert(input, bridg.alchemy.Person)
        person = session.merge(person)
        session.commit()
        return person  # type: ignore

    @strawberry.mutation
    def subject(self, input: SubjectInput, info: strawberry.Info[Context]) -> Subject:
        session = info.context.session
        converter = info.context.converter
        subject = converter.convert(input, bridg.alchemy.StudySubject)
        subject = session.merge(subject)
        session.commit()
        return subject  # type: ignore
