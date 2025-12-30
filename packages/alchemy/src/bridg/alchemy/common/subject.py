from typing import Optional
from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, declared_attr, mapped_column, relationship, validates

from ..db import Base
from .biologic_entity import BiologicEntity
from .organization import Organization


class Subject(Base):
    """
    DEFINITION:
    An entity of interest, either biological or otherwise.

    EXAMPLE(S):
    A human being who might be of interest because they are on a study
    A sheep who might have experienced an adverse event
    A pacemaker that failed
    Tissue that is undergoing gross evaluation
    Tissue that is to be embedded in paraffin

    OTHER NAME(S):

    NOTE(S):
    """

    __abstract__ = True

    performing_biologic_entity_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("biologic_entity.id"))

    @declared_attr
    def performing_biologic_entity(cls) -> Mapped[Optional[BiologicEntity]]:
        return relationship()

    performing_organization_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("organization.id"))

    @declared_attr
    def performing_organization(cls) -> Mapped[Optional[Organization]]:
        return relationship()

    @validates("performing_biologic_entity", "performing_organization")
    def validate_performing_entity(self, key, value):
        performing_entities = dict(
            performing_biologic_entity=self.performing_biologic_entity,
            performing_organization=self.performing_organization,
        )
        performing_entities[key] = value
        count = sum(pe is not None for pe in performing_entities.values())
        if count > 1:
            raise ValueError(
                "A Subject might be a function performed by one and only one of the following: BiologicEntity, Organization."
            )
        return value

    @property
    def performing_entity(self) -> BiologicEntity | Organization:
        entities = [self.performing_biologic_entity, self.performing_organization]
        entities = [p for p in entities if p]
        if len(entities) > 1:
            raise RuntimeError(
                "A Subject might be a function performed by one and only one of the following: BiologicEntity, Organization."
            )
        return entities[0]

    @performing_entity.setter
    def performing_entity(self, value: BiologicEntity | Organization):
        if isinstance(value, BiologicEntity):
            self.performing_biologic_entity = value
        if isinstance(value, Organization):
            self.performing_organization = value
