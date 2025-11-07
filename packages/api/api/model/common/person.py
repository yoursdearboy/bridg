from datetime import date
from typing import Optional
from uuid import UUID

import bridg

from ..base import BaseModel
from .entity_name import EntityName


class PersonData(BaseModel[bridg.Person]):
    _sa = bridg.Person

    administrative_gender_code: Optional[bridg.AdministrativeGender]
    birth_date: Optional[date]
    death_date: Optional[date]
    death_date_estimated_indicator: Optional[bool]
    death_indicator: Optional[bool]


class Person(PersonData):
    id: UUID
    primary_name: Optional[EntityName]
