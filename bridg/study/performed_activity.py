from datetime import datetime
from typing import Optional

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..common import Activity, StudySubject
from ..protocol import DefinedActivity, Epoch, StudyProtocolVersion


class PerformedActivity(Activity):
    __tablename__ = "performed_activity"
    __mapper_args__ = {"concrete": True}

    id: Mapped[int] = mapped_column(primary_key=True)

    repetition_number: Mapped[Optional[int]]
    name_code_modified_text: Mapped[Optional[str]]
    negation_indicator: Mapped[Optional[bool]]
    status_code: Mapped[Optional[str]]
    status_date: Mapped[Optional[datetime]]

    containing_epoch_id: Mapped[Optional[int]] = mapped_column(ForeignKey("epoch.id"))
    containing_epoch: Mapped[Optional[Epoch]] = relationship()
    """
    Each PerformedActivity might be contained by one Epoch.
    Each Epoch might contain one or more PerformedActivity.
    """

    executing_study_protocol_version_id: Mapped[Optional[int]] = mapped_column(ForeignKey("study_protocol_version.id"))
    executing_study_protocol_version: Mapped[Optional[StudyProtocolVersion]] = relationship()
    """
    Each PerformedActivity might execute under one StudyProtocolVersion.
    Each StudyProtocolVersion might be executed by one or more PerformedActivity.
    """

    instantiated_defined_activity_id: Mapped[Optional[int]] = mapped_column(ForeignKey("defined_activity.id"))
    instantiated_defined_activity: Mapped[Optional[DefinedActivity]] = relationship()
    """
    Each PerformedActivity might instantiate one DefinedActivity.
    Each DefinedActivity might be instantiated by one or more PerformedActivity.
    """

    involved_subject_id: Mapped[Optional[int]] = mapped_column(ForeignKey("study_subject.id"))
    involved_subject: Mapped[Optional[StudySubject]] = relationship(back_populates="involving_performed_activity")
    """
    Each Activity might be participated in by one Subject.
    Each Subject might participate in one or more Activity.
    """
