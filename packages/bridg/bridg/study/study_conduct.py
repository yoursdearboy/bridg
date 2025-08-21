from __future__ import annotations

from typing import TYPE_CHECKING, List

from sqlalchemy.orm import Mapped, relationship

from ..common import ProjectConduct

if TYPE_CHECKING:
    from .study_site import StudySite


class StudyConduct(ProjectConduct):
    """
    DEFINITION:
    An ongoing and/or past performance of a formal investigation as specified in a study protocol.

    EXAMPLE(S):

    OTHER NAME(S):

    NOTE(S):
    """

    __mapper_args__ = {"polymorphic_identity": "study"}

    executing_study_site: Mapped[List[StudySite]] = relationship(back_populates="executed_study_conduct")
    """
    Each StudySite might execute one StudyConduct.
    Each StudyConduct might be executed at one or more StudySite.
    """
