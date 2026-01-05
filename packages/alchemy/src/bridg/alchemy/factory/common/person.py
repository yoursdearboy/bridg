from polyfactory import Ignore, Use

from bridg.alchemy import AdministrativeGender, BiologicEntityIdentifier, Person

from ..base import BaseFactory
from .entity_name import EntityNameFactory
from .id import IDFactory


class BiologicEntityIdentifierFactory(IDFactory[BiologicEntityIdentifier]):
    id = Ignore()
    biologic_entity_id = Ignore()
    biologic_entity = Ignore()


class PersonFactory(BaseFactory[Person]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    type = Ignore()
    administrative_gender_code = Use(lambda: BaseFactory.__random__.choice(list(AdministrativeGender)))
    birth_date = Use(lambda: BaseFactory.__faker__.date_this_century(after_today=True))
    death_date = None
    death_date_estimated_indicator = None
    death_indicator = False

    name = Use(lambda: EntityNameFactory.batch(1))
    identifier = Use(lambda: BiologicEntityIdentifierFactory.batch(1))
    performed_healthcare_provider = Ignore()
    # postal_address
    # telecom_address
