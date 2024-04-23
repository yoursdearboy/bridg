import unittest
import sqlalchemy as sa
from sqlalchemy.orm import Session

from umdb.person.model import Person

class TestPersonModel(unittest.TestCase):
    def test_some(self):
        p = Person()
        self.assertIsNotNone(p)

    def test_persistence(self):
        engine = sa.create_engine("sqlite://")
        Person.metadata.create_all(engine)
        with Session(engine) as session:
            a = Person(id = 1)
            session.add(a)
            session.commit()
            b = session.query(Person).filter_by(id = 1).one()
        self.assertEqual(a.id, b.id)
