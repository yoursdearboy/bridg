from datetime import date
from typing import Any, List, Optional
from uuid import UUID

from pydantic import Field, computed_field

import bridg.alchemy

from ..base import BaseModel
from ..datatype import PostalAddress, PostalAddressData, TelecommunicationAddress, TelecommunicationAddressData
from .biologic_entity import BiologicEntityIdentifier, BiologicEntityName, BiologicEntityNameData
from .id import ID


class PersonPostalAddressData(PostalAddressData[bridg.alchemy.PersonPostalAddress]):
    _sa = bridg.alchemy.PersonPostalAddress


class PersonPostalAddress(PostalAddress[bridg.alchemy.PersonPostalAddress]):
    id: UUID


class PersonTelecommunicationAddressData(TelecommunicationAddressData[bridg.alchemy.PersonTelecommunicationAddress]):
    _sa = bridg.alchemy.PersonTelecommunicationAddress


class PersonTelecommunicationAddress(TelecommunicationAddress[bridg.alchemy.PersonTelecommunicationAddress]):
    id: UUID


class PersonAttributes(BaseModel[bridg.alchemy.Person]):
    administrative_gender_code: Optional[bridg.alchemy.AdministrativeGender]
    birth_date: Optional[date]
    death_date: Optional[date]
    death_date_estimated_indicator: Optional[bool]
    death_indicator: Optional[bool]


class PersonData(PersonAttributes):
    _sa = bridg.alchemy.Person

    primary_name: Optional[BiologicEntityNameData]
    primary_identifier: Optional[BiologicEntityIdentifier]

    def model_dump_sa(self, exclude=set(), context: Any = None) -> bridg.alchemy.Person:
        obj = super().model_dump_sa(exclude | {"primary_name", "primary_identifier"}, context)
        obj.name = []
        if self.primary_name:
            obj.name.append(self.primary_name.model_dump_sa(context=context))
        if self.primary_identifier:
            obj.identifier.append(self.primary_identifier.model_dump_sa(context=context))  # type: ignore
        return obj


class PersonPatch(PersonAttributes):
    _sa = bridg.alchemy.Person


class Person(PersonAttributes):
    id: UUID
    name: List[BiologicEntityName] = Field(exclude=True)
    identifier: List[ID]

    @computed_field
    @property
    def primary_name(self) -> Optional[BiologicEntityName]:
        return next(iter(self.name), None)
