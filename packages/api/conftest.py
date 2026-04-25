import pytest
from sqlalchemy.orm import Session
from syrupy.assertion import SnapshotAssertion
from syrupy.extensions.json import JSONSnapshotExtension

from bridg.alchemy.test.fixture import *  # noqa: F403  # pyright: ignore[reportWildcardImportFromLibrary]
from bridg.api.db import get_db
from bridg.api.main import app
from bridg.common.env import load_env

load_env()


@pytest.fixture
def snapshot_json(snapshot) -> SnapshotAssertion:
    return snapshot.with_defaults(extension_class=JSONSnapshotExtension)


@pytest.fixture(autouse=True)
def app_db(session: Session):
    app.dependency_overrides[get_db] = lambda: session
