from umdb.db import Base, engine
from umdb.person.model import Name, Person

Base.metadata.create_all(bind=engine)
