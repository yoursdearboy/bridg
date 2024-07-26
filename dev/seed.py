from datetime import date

from umdb.common.model import Name
from umdb.db import SessionLocal
from umdb.person.model import Person

jd_name_1 = Name(use="official", family="Doe", given="John")
jd_name_2 = Name(use="unofficial", family="Doe", given="Johny")
jd = Person(
    id=1,
    names=[jd_name_1, jd_name_2],
    birth_date=date(1980, 1, 1),
    death_date=date(2000, 1, 1),
    death_date_estimated_indicator=True,
    death_indicator=True,
)

dm_name_1 = Name(use="official", family="Morgendorffer", given="Daria")
dm = Person(id=2, names=[dm_name_1], birth_date=date(1991, 1, 1))

with SessionLocal() as session:
    session.add_all([jd, dm])
    session.commit()
