import pytest
from syrupy.assertion import SnapshotAssertion
from syrupy.extensions.json import JSONSnapshotExtension

from bridg.alchemy.test.fixture import database, random, session  # noqa: F401
from bridg.common.env import load_env

load_env()


@pytest.fixture
def snapshot_json(snapshot) -> SnapshotAssertion:
    return snapshot.with_defaults(extension_class=JSONSnapshotExtension)
