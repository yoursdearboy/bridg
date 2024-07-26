from umdb.common.model import BiologicEntity, Name
from umdb.person.model import Person
from umdb.db import Base, engine

Base.metadata.create_all(bind=engine)
