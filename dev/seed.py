from umdb.db import SessionLocal
from umdb.person.model import Name, Person

jd_name_1 = Name(use="official", family="Doe", given="John")
jd_name_2 = Name(use="unofficial", family="Doe", given="Johny")
jd = Person(id=1, names=[jd_name_1, jd_name_2])

dm_name_1 = Name(use="official", family="Morgendorffer", given="Daria")
dm = Person(id=2, names=[dm_name_1])

with SessionLocal() as session:
    session.add_all([jd, dm])
    session.commit()
