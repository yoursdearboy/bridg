from datetime import date
from typing import Optional
from uuid import UUID

import bridg

from ..base import BaseModel
from .entity_name import EntityName, EntityNameData


class PersonAttributes(BaseModel[bridg.Person]):
    administrative_gender_code: Optional[bridg.AdministrativeGender]
    birth_date: Optional[date]
    death_date: Optional[date]
    death_date_estimated_indicator: Optional[bool]
    death_indicator: Optional[bool]


class PersonData(PersonAttributes):
    _sa = bridg.Person

    primary_name: Optional[EntityNameData]

    def model_dump_sa(self) -> bridg.Person:
        return bridg.Person(
            name=[self.primary_name.model_dump_sa()] if self.primary_name else [],
            administrative_gender_code=self.administrative_gender_code,
            birth_date=self.birth_date,
            death_date=self.death_date,
            death_date_estimated_indicator=self.death_date_estimated_indicator,
            death_indicator=self.death_indicator,
        )

    def model_update_sa(self, obj: bridg.Person, exclude=set()) -> bridg.Person:
        return super().model_update_sa(obj, exclude | {"primary_name"})


class Person(PersonAttributes):
    id: UUID
    primary_name: Optional[EntityName]
