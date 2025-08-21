from __future__ import annotations

from typing import TYPE_CHECKING, List
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.ext.associationproxy import AssociationProxy, association_proxy
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base
from .study_subject_protocol_version_relationship import (
    StudySubjectProtocolVersionRelationship,
)

if TYPE_CHECKING:
    from ..common import StudySubject
    from ..protocol import StudyProtocolVersion
    from .study_site import StudySite


class StudySiteProtocolVersionRelationship(Base):
    """
    DEFINITION:
    Specifies the link between a study site and a version of the study protocol used or available for use at that site.

    EXAMPLE(S):

    OTHER NAME(S):

    NOTE(S):
    Even if a study site's IRB has not reviewed the study protocol version, if there is a new version for the study protocol, then there is the potential for a relationship between the site and the version.  The dateRange is specified only if the version is approved for this site by the IRB and activated at the site.  Retroactive approval means that the dateRange does not have to be on or after the IRB approval date.
    """

    __tablename__ = "study_site_protocol_version_relationship"

    id: Mapped[UUID] = mapped_column(unique=True, default=uuid4)

    executing_study_site_id: Mapped[UUID] = mapped_column(ForeignKey("study_site.id"), primary_key=True)
    executing_study_site: Mapped[StudySite] = relationship(
        back_populates="executed_study_site_protocol_version_relationship"
    )
    """
    Each StudySiteProtocolVersionRelationship always is executed at one StudySite.
    Each StudySite might execute one or more StudySiteProtocolVersionRelationship.
    """

    executed_study_protocol_version_id: Mapped[UUID] = mapped_column(
        ForeignKey("study_protocol_version.id"), primary_key=True
    )
    executed_study_protocol_version: Mapped[StudyProtocolVersion] = relationship(
        back_populates="executing_study_site_protocol_version_relationship"
    )
    """
    Each StudySiteProtocolVersionRelationship always executes one StudyProtocolVersion.
    Each StudyProtocolVersion might be executed at one or more StudySiteProtocolVersionRelationship.
    """

    assigned_study_subject_protocol_version_relationship: Mapped[List[StudySubjectProtocolVersionRelationship]] = (
        relationship(
            back_populates="assigning_study_site_protocol_version_relationship",
            # too much cascades for many-to-many-to-many
            # it's better managed on the other side of relation
            # cascade="all, delete-orphan",
            # so viewonly
            viewonly=True,
        )
    )
    """
    Each StudySubjectProtocolVersionRelationship always is assigned to one StudySiteProtocolVersionRelationship.
    Each StudySiteProtocolVersionRelationship might be the assigned version for one or more StudySubjectProtocolVersionRelationship.
    """

    assigned_study_subject: AssociationProxy[List[StudySubject]] = association_proxy(
        "assigned_study_subject_protocol_version_relationship",
        "assigning_study_subject",
        creator=lambda ass: StudySubjectProtocolVersionRelationship(assigning_study_subject=ass),
    )

    def __str__(self):
        return f"{self.executing_study_site.performing_entity} in {self.executed_study_protocol_version}"
