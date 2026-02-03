import strawberry

from bridg import alchemy

from .common import Person, PersonInput
from .context import Context


@strawberry.type
class Mutation:
    @strawberry.mutation
    def person(self, input: PersonInput, info: strawberry.Info[Context]) -> Person:
        session = info.context.session
        person = alchemy.Person()
        if input.id is not None:
            person.id = input.id.value
        if input.administrative_gender_code is not None:
            person.administrative_gender_code = input.administrative_gender_code.value
        if input.birth_date is not None:
            person.birth_date = input.birth_date.value
        if input.name is not None:
            for name in input.name.value:
                en = alchemy.BiologicEntityName()
                if name.id is not None:
                    en.id = name.id.value
                if name.family is not None:
                    en.family = name.family.value
                if name.given is not None:
                    en.given = name.given.value
                person.name.append(en)
        person = session.merge(person)
        session.commit()
        return person  # type: ignore
