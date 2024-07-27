from datetime import date

from api.db import SessionLocal
from umdb.organization import HealthcareFacility, Organization, OrganizationName
from umdb.organization.healthcare import HealthcareProvider, HealthcareProviderGroup
from umdb.person import Name as PersonName
from umdb.person import Person

jd = Person(
    id=1,
    name=[
        PersonName(use="official", family="Doe", given="John"),
        PersonName(use="unofficial", family="Doe", given="Johny"),
    ],
    birth_date=date(1980, 1, 1),
    death_date=date(2000, 1, 1),
    death_date_estimated_indicator=True,
    death_indicator=True,
)

dm = Person(
    id=2,
    name=[PersonName(use="official", family="Morgendorffer", given="Daria")],
    birth_date=date(1991, 1, 1),
)

dgoi = HealthcareFacility(
    performing_organization=Organization(name=[OrganizationName(value="DGOI")])
)

dr_burbir = HealthcareProvider(
    performing_person=Person(
        id=3, name=[PersonName(use="official", family="Bur", given="Bir")]
    ),
    staffed_healthcare_facility=dgoi,
    employing_organization=dgoi.performing_organization,
)

d4 = HealthcareProviderGroup(
    performing_organization=Organization(name=[OrganizationName(value="4D")]),
    using_healthcare_facility=dgoi,
    grouped_healthcare_provider=[dr_burbir],
)

with SessionLocal() as session:
    session.add_all([jd, dm, dgoi, dr_burbir, d4])
    session.commit()
