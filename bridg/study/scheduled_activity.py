from typing import Optional

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..common import Activity, StudySubject


class ScheduledActivity(Activity):
    __tablename__ = "scheduled_activity"
    __mapper_args__ = {"concrete": True}

    id: Mapped[int] = mapped_column(primary_key=True)

    involved_subject_id: Mapped[Optional[int]] = mapped_column(ForeignKey("study_subject.id"))
    involved_subject: Mapped[Optional[StudySubject]] = relationship(back_populates="involving_scheduled_activity")
    """
    Each Activity might be participated in by one Subject.
    Each Subject might participate in one or more Activity.
    """
