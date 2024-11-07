# ruff: noqa: F403, F405

from bridg import *

from .db import engine

Base.metadata.create_all(bind=engine)
