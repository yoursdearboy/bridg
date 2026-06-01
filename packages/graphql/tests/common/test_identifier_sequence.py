from unittest.mock import patch

from bridg.alchemy import Sequence, SequenceType
from bridg.graphql.context import Context
from bridg.graphql.schema import schema


def test_identifier_sequence_generation(context: Context):
    session = context.session

    seq = Sequence(name="test-seq", type=SequenceType.PLAIN)
    session.add(seq)
    session.commit()

    query_two = """
        mutation($i1: PersonInput!, $i2: PersonInput!) {
            A: PersonCreate(input: $i1) {
                identifier { identifier }
            }
            B: PersonCreate(input: $i2) {
                identifier { identifier }
            }
        }
    """
    variables_two = {
        "i1": {"identifier": [{"sequence": "test-seq"}]},
        "i2": {"identifier": [{"sequence": "test-seq"}]},
    }

    result = schema.execute_sync(query_two, variables_two, context_value=context)
    assert result.errors is None
    assert result.data is not None
    assert result.data["A"]["identifier"][0]["identifier"] == {"root": "1", "extension": None}
    assert result.data["B"]["identifier"][0]["identifier"] == {"root": "2", "extension": None}

    query_one = """
        mutation($i: PersonInput!) {
            PersonCreate(input: $i) {
                identifier { identifier }
            }
        }
    """
    variables_one = {"i": {"identifier": [{"sequence": "test-seq"}]}}

    result = schema.execute_sync(query_one, variables_one, context_value=context)
    assert result.errors is None
    assert result.data is not None
    assert result.data["PersonCreate"]["identifier"][0]["identifier"] == {"root": "3", "extension": None}

    session.refresh(seq)
    assert seq.counter == 3


def test_rollback_does_not_increment_sequence(context: Context):
    session = context.session

    seq = Sequence(name="rollback-seq", type=SequenceType.PLAIN)
    session.add(seq)
    session.commit()

    query = """
        mutation($i: PersonInput!) {
            PersonCreate(input: $i) { id }
        }
    """
    variables = {"i": {"identifier": [{"sequence": "rollback-seq"}]}}

    # Patch commit to raise, triggering the except/rollback branch in SQLAlchemyExtension.on_execute
    with patch.object(session, "commit", side_effect=RuntimeError("simulated failure")):
        result = schema.execute_sync(query, variables, context_value=context)

    assert result.errors is not None
    session.refresh(seq)
    assert seq.counter == 0
