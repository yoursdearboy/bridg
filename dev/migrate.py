# ruff: noqa: F403, F405

from api.db import engine
from umdb import *

Base.metadata.create_all(bind=engine)
