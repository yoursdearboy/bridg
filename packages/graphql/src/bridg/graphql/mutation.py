import strawberry

import bridg.alchemy

from .common import Person, PersonInput
from .context import Context
from .converter import converter


@strawberry.type
class Mutation:
    @strawberry.mutation
    def person(self, input: PersonInput, info: strawberry.Info[Context]) -> Person:
        session = info.context.session
        person = converter.convert(input, bridg.alchemy.Person, context=info.context)
        person = session.merge(person)
        session.commit()
        return person  # type: ignore
