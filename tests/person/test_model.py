import unittest

import sqlalchemy as sa
from sqlalchemy.orm import Session

from umdb.person import Name, Person


class TestPersonModel(unittest.TestCase):
    def __create__data(self):
        p = Person()
        n1 = Name(family="Doe", given="John", use="official")
        n2 = Name(family="Doe", given="Johny", use="non-official")
        return dict(p=p, n1=n1, n2=n2)

    def test_person(self):
        d = self.__create__data()
        self.assertIsNotNone(d["p"])

    def test_names(self):
        d = self.__create__data()
        d["p"].names.append(d["n1"])
        d["p"].names.append(d["n2"])

    def test_persistence(self):
        d = self.__create__data()
        engine = sa.create_engine("sqlite://")
        Person.metadata.create_all(engine)
        with Session(engine) as session:
            a = Person(id=1)
            a.names = [d["n1"], d["n2"]]
            session.add(a)
            session.commit()

            b = session.query(Person).filter_by(id=1).one()

            self.assertEqual(a.id, b.id)
            self.assertEqual(2, len(b.names))

    def test_name_loading(self):
        d = self.__create__data()
        engine = sa.create_engine("sqlite://")
        Person.metadata.create_all(engine)
        with Session(engine) as session:
            a = Person(id=1)
            a.names = [d["n1"], d["n2"]]
            session.add(a)
            session.commit()

            b = session.query(Person).filter_by(id=1).one()

            self.assertEqual(b.name, d["n1"])
