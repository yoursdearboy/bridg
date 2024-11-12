from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import TYPE_CHECKING, List, Optional

from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .subject import Subject

if TYPE_CHECKING:
    from ..study import StudySiteProtocolVersionRelationship, StudySubjectProtocolVersionRelationship


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

    __tablename__ = "study_subject"
    __mapper_args__ = {"concrete": True}

    id: Mapped[int] = mapped_column(primary_key=True)

    status: Mapped[Optional[Status]]
    status_date: Mapped[Optional[datetime]]

    assigned_study_subject_protocol_version_relationship: Mapped[List[StudySubjectProtocolVersionRelationship]] = (
        relationship(back_populates="assigning_study_subject", cascade="all, delete-orphan")
    )
    """
    Each StudySubjectProtocolVersionRelationship always is the assigned version for one StudySubject.
    Each StudySubject might be assigned to one or more StudySubjectProtocolVersionRelationship.
    """

    @staticmethod
    def __assigned_study_site_protocol_version_relationship_creator(asspvr):
        from ..study import StudySubjectProtocolVersionRelationship

        return StudySubjectProtocolVersionRelationship(assigning_study_site_protocol_version_relationship=asspvr)

    assigned_study_site_protocol_version_relationship: AssociationProxy[List[StudySiteProtocolVersionRelationship]] = (
        association_proxy(
            "assigned_study_subject_protocol_version_relationship",
            "assigning_study_site_protocol_version_relationship",
            creator=__assigned_study_site_protocol_version_relationship_creator,
        )
    )
