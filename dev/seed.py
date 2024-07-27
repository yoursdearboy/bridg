from datetime import date

from api.db import SessionLocal
from umdb.organization import HealthcareFacility, Organization, OrganizationName
from umdb.person import Name as PersonName
from umdb.person import Person

jd_name_1 = PersonName(use="official", family="Doe", given="John")
jd_name_2 = PersonName(use="unofficial", family="Doe", given="Johny")
jd = Person(
    id=1,
    names=[jd_name_1, jd_name_2],
    birth_date=date(1980, 1, 1),
    death_date=date(2000, 1, 1),
    death_date_estimated_indicator=True,
    death_indicator=True,
)

dm_name_1 = PersonName(use="official", family="Morgendorffer", given="Daria")
dm = Person(id=2, names=[dm_name_1], birth_date=date(1991, 1, 1))

org1_name = OrganizationName(value="org1")
org1 = Organization(names=[])

org2_name = OrganizationName(value="org2")
org2 = Organization(names=[])
hf2 = HealthcareFacility(performing_organization=org2)

with SessionLocal() as session:
    session.add_all([jd, dm, org1, org2, hf2])
    session.commit()
