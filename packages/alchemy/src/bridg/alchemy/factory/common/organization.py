from polyfactory import Ignore, Use

from bridg.alchemy import Organization, OrganizationName

from ..base import BaseFactory


class OrganizationNameFactory(BaseFactory[OrganizationName]):
    id = Ignore()
    organization_id = Ignore()
    organization = Ignore()

    value = Use(BaseFactory.__faker__.company)


class OrganizationFactory(BaseFactory[Organization]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()

    name = Use(lambda: OrganizationNameFactory.batch(1))

    type = None
    description = None
    actual = True

    performed_healthcare_facility = Ignore()
    performed_healthcare_provider_group = Ignore()
    employed_healthcare_provider = Ignore()
    performed_subject = Ignore()
