from datetime import timedelta
from uuid import uuid4

from sqlalchemy.orm import Session
from strawberry import Some

from bridg.alchemy import Person
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from .factory import PersonInputFactory
from .utils import process_input


def test_versioning(context: Context, session: Session):
    query = """
        mutation test($input: PersonInput!) {
            PersonCreate(input: $input) {
                id
                birthDate
            }
        }
    """

    birth_date = PersonInputFactory.__faker__.date_this_century(after_today=True)
    id_ = uuid4()
    input = PersonInputFactory.build(id=id_, birth_date=birth_date)

    # create
    result = schema.execute_sync(query, dict(input=process_input(input)), context_value=context)
    assert result.errors is None
    p = session.get(Person, id_)
    assert p is not None
    assert len(list(p.versions)) == 1
    v1 = p.versions[0]
    assert v1.birth_date == birth_date

    session.rollback()

    # update
    input.birth_date = Some(birth_date + timedelta(days=1))
    result = schema.execute_sync(query, dict(input=process_input(input)), context_value=context)
    assert result.errors is None
    assert len(list(p.versions)) == 2
    v1 = p.versions[0]
    v2 = p.versions[1]
    assert v1.birth_date == birth_date
    assert v2.birth_date == birth_date + timedelta(days=1)
