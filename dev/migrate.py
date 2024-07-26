from umdb.common import BiologicEntity, Name
from umdb.person import Person
from umdb.db import Base, engine

Base.metadata.create_all(bind=engine)
