from bridg import alchemy

from ..strawchemy import strawchemy

__INCLUDE__ = {
    "id",
    "type",
    "administrative_gender_code",
    "birth_date",
    "death_date",
    "death_date_estimated_indicator",
    "death_indicator",
    "identifier",
    "name",
    "postal_address",
    "telecom_address",
}


@strawchemy.type(alchemy.Person, include=__INCLUDE__, scope="global")
class Person:
    pass
