import unittest
import sqlalchemy as sa
from sqlalchemy.orm import Session

from umdb.person.model import Name, Person

p = Person()
n1 = Name(family="Doe", given="John", use="official")
n2 = Name(family="Doe", given="Johny", use="non-official")


class TestPersonModel(unittest.TestCase):
    def test_person(self):
        self.assertIsNotNone(p)

    def test_names(self):
        p.names.append(n1)
        p.names.append(n2)

    def test_persistence(self):
        engine = sa.create_engine("sqlite://")
        Person.metadata.create_all(engine)
        with Session(engine) as session:
            a = Person(id=1)
            a.names = [n1, n2]
            session.add(a)
            session.commit()

            b = session.query(Person).filter_by(id=1).one()

            self.assertEqual(a.id, b.id)
            self.assertEqual(2, len(b.names))
