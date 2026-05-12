from datetime import timedelta
from uuid import uuid4

from sqlalchemy.orm import Session
from strawberry import Some

from bridg.alchemy import Person
from bridg.auth import AuthenticatedUser, User
from bridg.graphql import versioning
from bridg.graphql.context import Context
from bridg.graphql.schema import schema

from .factory import PersonInputFactory
from .utils import process_input


def test_versioning(context: Context, monkeypatch, session: Session):
    query = """
        mutation test($input: PersonInput!) {
            PersonCreate(input: $input) {
                id
                birthDate
            }
        }
    """

    user = User(username="test")
    session.add(user)
    session.commit()
    monkeypatch.setattr(versioning, "get_user", lambda: AuthenticatedUser(user))

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
    assert v1.transaction.user_id == user.id  # type: ignore

    session.rollback()

    # update
    input.birth_date = Some(birth_date + timedelta(days=1))
    result = schema.execute_sync(query, dict(input=process_input(input)), context_value=context)
    assert result.errors is None
    assert len(list(p.versions)) == 2
    v1 = p.versions[0]
    v2 = p.versions[1]
    assert v1.birth_date == birth_date
    assert v1.transaction.user_id == user.id  # type: ignore
    assert v2.birth_date == birth_date + timedelta(days=1)
    assert v2.transaction.user_id == user.id  # type: ignore
