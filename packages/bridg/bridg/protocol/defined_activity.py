from datetime import datetime
from typing import List, Optional
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..common import Activity
from ..core import ConceptDescriptor
from .study_activity import StudyActivity


class DefinedActivity(Activity):
    __tablename__ = "defined_activity"
    __mapper_args__ = {"concrete": True, "polymorphic_abstract": True, "polymorphic_on": "type"}

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    type: Mapped[str]

    name_code_id: Mapped[UUID] = mapped_column(ForeignKey("concept_descriptor.id"))
    name_code: Mapped[ConceptDescriptor] = relationship(foreign_keys=name_code_id)

    category_code_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("concept_descriptor.id"))
    category_code: Mapped[Optional[ConceptDescriptor]] = relationship(foreign_keys=category_code_id)

    subcategory_code_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("concept_descriptor.id"))
    subcategory_code: Mapped[Optional[ConceptDescriptor]] = relationship(foreign_keys=subcategory_code_id)

    description: Mapped[Optional[str]]

    status_code_id: Mapped[Optional[UUID]] = mapped_column(ForeignKey("concept_descriptor.id"))
    status_code: Mapped[Optional[ConceptDescriptor]] = relationship(foreign_keys=status_code_id)

    status_date: Mapped[Optional[datetime]]

    using_study_activity: Mapped[List[StudyActivity]] = relationship()
    """
    Each StudyActivity always uses one DefinedActivity.
    Each DefinedActivity might be used by one or more StudyActivity.
    """

    def __str__(self):
        return str(self.name_code)
