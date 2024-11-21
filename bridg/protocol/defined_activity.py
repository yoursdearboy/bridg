from datetime import datetime
from typing import List, Optional

from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..common.activity import Activity
from .study_activity import StudyActivity


class DefinedActivity(Activity):
    __tablename__ = "defined_activity"
    __mapper_args__ = {"concrete": True}

    id: Mapped[int] = mapped_column(primary_key=True)

    name_code: Mapped[str]
    category_code: Mapped[Optional[str]]
    subcategory_code: Mapped[Optional[str]]
    description: Mapped[Optional[str]]
    status_code: Mapped[Optional[str]]
    status_date: Mapped[Optional[datetime]]

    using_study_activity: Mapped[List[StudyActivity]] = relationship()
    """
    Each StudyActivity always uses one DefinedActivity.
    Each DefinedActivity might be used by one or more StudyActivity.
    """

    def __str__(self):
        return self.name_code
