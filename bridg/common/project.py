from __future__ import annotations

from typing import TYPE_CHECKING, Optional

from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base

if TYPE_CHECKING:
    from .project_conduct import ProjectConduct


class Project(Base):
    """
    DEFINITION:
    A set of coordinated activities that is intended to achieve one or more objectives.

    EXAMPLE(S):
    The Cancer Genome Atlas (TCGA)
    The Breast and Colon Cancer Family Registries

    OTHER NAME(S):

    NOTE(S):
    """

    __tablename__ = "project"
    __mapper_args__ = {
        "polymorphic_identity": "project",
        "polymorphic_on": "kind",
    }

    id: Mapped[int] = mapped_column(primary_key=True)
    kind: Mapped[str]

    name: Mapped[Optional[str]]
    type: Mapped[Optional[str]]
    description: Mapped[Optional[str]]

    instantiated_project_execution: Mapped[Optional[ProjectConduct]] = relationship(
        back_populates="instantiating_project"
    )
    """
    Each ProjectConduct always is the execution of one Project.
    Each Project might have as execution one ProjectConduct.
    """

    def __str__(self):
        if self.name:
            return self.name
        return "Unnamed"
