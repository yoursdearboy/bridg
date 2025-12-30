from datetime import date
from typing import Any, Optional
from uuid import UUID

import bridg.alchemy

from ..base import BaseModel
from .entity_name import EntityName, EntityNameData


class PersonAttributes(BaseModel[bridg.alchemy.Person]):
    administrative_gender_code: Optional[bridg.alchemy.AdministrativeGender]
    birth_date: Optional[date]
    death_date: Optional[date]
    death_date_estimated_indicator: Optional[bool]
    death_indicator: Optional[bool]


class PersonData(PersonAttributes):
    _sa = bridg.alchemy.Person

    primary_name: Optional[EntityNameData]

    def model_dump_sa(self, exclude=set(), context: Any = None) -> bridg.alchemy.Person:
        obj = super().model_dump_sa(exclude | {"primary_name"}, context)
        obj.name = []
        if self.primary_name:
            obj.name.append(self.primary_name.model_dump_sa(context=context))
        return obj


class PersonPatch(PersonAttributes):
    _sa = bridg.alchemy.Person


class Person(PersonAttributes):
    id: UUID
    primary_name: Optional[EntityName]
