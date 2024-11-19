from __future__ import annotations

from typing import TYPE_CHECKING, Optional

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base
from .study_protocol_version import StudyProtocolVersion

if TYPE_CHECKING:
    from .defined_activity import DefinedActivity


class StudyActivity(Base):
    __tablename__ = "study_activity"

    id: Mapped[int] = mapped_column(primary_key=True)

    study_focus_indicator: Mapped[Optional[bool]]

    using_study_protocol_version_id: Mapped[int] = mapped_column(ForeignKey("study_protocol_version.id"))
    using_study_protocol_version: Mapped[Optional[StudyProtocolVersion]] = relationship(
        back_populates="used_study_activity"
    )
    """
    Each StudyActivity might be used by one StudyProtocolVersion.
    Each StudyProtocolVersion might use one or more StudyActivity.
    """

    used_defined_activity_id: Mapped[int] = mapped_column(ForeignKey("defined_activity.id"))
    used_defined_activity: Mapped[DefinedActivity] = relationship(back_populates="using_study_activity")
    """
    Each StudyActivity always uses one DefinedActivity.
    Each DefinedActivity might be used by one or more StudyActivity.
    """
