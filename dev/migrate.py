# ruff: noqa: F403, F405

from bridg import *
from common.db import engine

Base.metadata.create_all(bind=engine)
