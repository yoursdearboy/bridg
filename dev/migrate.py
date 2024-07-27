# ruff: noqa: F403

from api.db import engine
from umdb.common import *
from umdb.db import Base
from umdb.organization import *
from umdb.person import *

Base.metadata.create_all(bind=engine)
