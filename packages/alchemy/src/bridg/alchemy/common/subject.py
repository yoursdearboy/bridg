from __future__ import annotations

from typing import TYPE_CHECKING, List, Optional
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship, validates

from ..db import Base
from ..versioned import Versioned
from .biologic_entity import BiologicEntity
from .organization import Organization

if TYPE_CHECKING:
    from ..biospecimen import Specimen
    from ..study import PerformedActivity, ScheduledActivity


class Subject(Versioned, Base):
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

    __tablename__ = "subject"
    __mapper_args__ = {
        "polymorphic_on": "type",
        "polymorphic_identity": "subject",
    }

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    type: Mapped[str]

    performing_biologic_entity_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("biologic_entity.id"))
    performing_biologic_entity: Mapped[Optional[BiologicEntity]] = relationship(back_populates="performed_subject")

    performing_organization_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("organization.id"))
    performing_organization: Mapped[Optional[Organization]] = relationship(back_populates="performed_subject")

    performing_specimen_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("specimen.id"))
    performing_specimen: Mapped[Optional[Specimen]] = relationship(back_populates="performed_subject")

    involving_performed_activity: Mapped[List[PerformedActivity]] = relationship(back_populates="involved_subject")
    involving_scheduled_activity: Mapped[List[ScheduledActivity]] = relationship(back_populates="involved_subject")

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
