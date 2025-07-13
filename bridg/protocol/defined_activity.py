from datetime import datetime
from typing import List, Optional
from uuid import UUID, uuid4

from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..common import Activity
from ..core import Code, code_column
from .study_activity import StudyActivity


class DefinedActivity(Activity):
    __tablename__ = "defined_activity"
    __mapper_args__ = {"concrete": True, "polymorphic_abstract": True, "polymorphic_on": "type"}

    class NameCode(Code): ...

    class CategoryCode(Code): ...

    class SubcategoryCode(Code): ...

    class StatusCode(Code): ...

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    type: Mapped[str]

    name_code_id: Mapped[UUID] = code_column(NameCode)
    name_code: Mapped[NameCode] = relationship()

    category_code_id: Mapped[Optional[UUID]] = code_column(CategoryCode)
    category_code: Mapped[Optional[CategoryCode]] = relationship()

    subcategory_code_id: Mapped[Optional[UUID]] = code_column(SubcategoryCode)
    subcategory_code: Mapped[Optional[SubcategoryCode]] = relationship()

    description: Mapped[Optional[str]]

    status_code_id: Mapped[Optional[UUID]] = code_column(StatusCode)
    status_code: Mapped[Optional[StatusCode]] = relationship()

    status_date: Mapped[Optional[datetime]]

    using_study_activity: Mapped[List[StudyActivity]] = relationship()
    """
    Each StudyActivity always uses one DefinedActivity.
    Each DefinedActivity might be used by one or more StudyActivity.
    """

    def __str__(self):
        return str(self.name_code)
