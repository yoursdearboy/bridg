import pytest
from sqlalchemy.orm import Session
from syrupy.assertion import SnapshotAssertion
from syrupy.extensions.json import JSONSnapshotExtension

from bridg.alchemy import TerminologyService
from bridg.alchemy.test.fixture import *  # noqa: F403  # pyright: ignore[reportWildcardImportFromLibrary]
from bridg.common.env import load_env
from bridg.graphql.context import Context
from bridg.graphql.converter import Converter

load_env()


@pytest.fixture
def context(session: Session, terminology: TerminologyService):
    return Context(
        request=None,  # pyright: ignore[reportArgumentType]
        response=None,  # pyright: ignore[reportArgumentType]
        session=session,
        converter=Converter(terminology=terminology),
        terminology=terminology,
    )


@pytest.fixture
def snapshot_json(snapshot) -> SnapshotAssertion:
    return snapshot.with_defaults(extension_class=JSONSnapshotExtension)
