from datetime import date
from enum import Enum
from typing import List, Optional

from sqlalchemy import ForeignKey, Identity
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship, validates

from umdb.common.biologic_entity import BiologicEntity
from umdb.db import Base
from umdb.organization.organization import Organization
from umdb.study.protocol import StudySiteProtocolVersionRelationship


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

    __tablename__ = "subject"
    __mapper_args__ = {"polymorphic_identity": "subject", "polymorphic_on": "type"}

    id: Mapped[int] = mapped_column(primary_key=True)
    type: Mapped[str]

    performing_biologic_entity_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("biologic_entity.id")
    )
    performing_biologic_entity: Mapped[Optional[BiologicEntity]] = relationship()

    performing_organization_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("organization.id")
    )
    performing_organization: Mapped[Optional[Organization]] = relationship()

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
    def performing_entity(self):
        entities = [self.performing_biologic_entity, self.performing_organization]
        entities = [p for p in entities if p]
        if len(entities) > 1:
            raise RuntimeError(
                "A Subject might be a function performed by one and only one of the following: BiologicEntity, Organization."
            )
        elif len(entities) == 1:
            return entities[0]


class Status(Enum):
    candidate = "candidate"
    eligible = "eligible"
    follow_up = "follow-up"
    ineligible = "ineligible"
    not_registered = "not-registered"
    off_study = "off-study"
    on_study = "on-study"
    on_study_intervention = "on-study-intervention"
    on_study_observation = "on-study-observation"
    pending_on_study = "pending-on-study"
    potential_candidate = "potential-candidate"
    screening = "screening"
    withdrawn = "withdrawn"


class StudySubject(Subject):
    """
    DEFINITION:
    A physical entity which is the primary unit of operational and/or administrative interest in a study.

    EXAMPLE(S):
    A person who is registered in a study as a recipient of an investigational product or as a control.

    Individuals who are being screened for studies.

    Individuals participating in observational or other studies.

    A pacemaker, a fuse that can be used in medical devices, a cow, a pen of pigs, or a tissue sample from a tissue bank.

    OTHER NAME(S):

    NOTE(S):
    StudySubjects within a study are all of the same type.  An entity registered in a study is not part of another entity registered in the same study.
    """

    __mapper_args__ = {"polymorphic_identity": "study_subject"}

    status: Mapped[Optional[Status]]
    status_date: Mapped[Optional[date]]

    assigned_study_subject_protocol_version_relationship: Mapped[
        List["StudySubjectProtocolVersionRelationship"]
    ] = relationship(
        back_populates="assigning_study_subject", cascade="all, delete-orphan"
    )
    """
    Each StudySubjectProtocolVersionRelationship always is the assigned version for one StudySubject.
    Each StudySubject might be assigned to one or more StudySubjectProtocolVersionRelationship.
    """

    assigned_study_site_protocol_version_relationship: AssociationProxy[
        List[StudySiteProtocolVersionRelationship]
    ] = association_proxy(
        "assigned_study_subject_protocol_version_relationship",
        "assigning_study_site_protocol_version_relationship",
        creator=lambda asspvr: StudySubjectProtocolVersionRelationship(
            assigning_study_site_protocol_version_relationship=asspvr
        ),
    )


class StudySubjectProtocolVersionRelationship(Base):
    """
    DEFINITION:
    Specifies the link between a study subject and a version of the study protocol at a site.

    EXAMPLE(S):

    OTHER NAME(S):

    NOTE(S):
    """

    __tablename__ = "study_subject_protocol_version_relationship"

    id: Mapped[int] = mapped_column(Identity(), unique=True)

    assigning_study_subject_id: Mapped[int] = mapped_column(
        ForeignKey("subject.id"), primary_key=True
    )
    assigning_study_subject: Mapped[StudySubject] = relationship(
        back_populates="assigned_study_subject_protocol_version_relationship",
    )
    """
    Each StudySubjectProtocolVersionRelationship always is the assigned version for one StudySubject.
    Each StudySubject might be assigned to one or more StudySubjectProtocolVersionRelationship.
    """

    assigning_study_site_protocol_version_relationship_id: Mapped[int] = mapped_column(
        ForeignKey("study_site_protocol_version_relationship.id"), primary_key=True
    )
    assigning_study_site_protocol_version_relationship: Mapped[
        StudySiteProtocolVersionRelationship
    ] = relationship(
        back_populates="assigned_study_subject_protocol_version_relationship",
    )
    """
    Each StudySubjectProtocolVersionRelationship always is assigned to one StudySiteProtocolVersionRelationship.
    Each StudySiteProtocolVersionRelationship might be the assigned version for one or more StudySubjectProtocolVersionRelationship.
    """
