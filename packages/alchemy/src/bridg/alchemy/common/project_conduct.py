from __future__ import annotations

from typing import TYPE_CHECKING
from uuid import UUID, uuid4

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db import Base

if TYPE_CHECKING:
    from .project import Project


class ProjectConduct(Base):
    """
    DEFINITION:
    An ongoing and/or past performance of a project.

    EXAMPLE(S):

    OTHER NAME(S):

    NOTE(S):
    """

    __tablename__ = "project_conduct"
    __mapper_args__ = {
        "polymorphic_identity": "project",
        "polymorphic_on": "kind",
    }

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    kind: Mapped[str]

    instantiating_project_id: Mapped[UUID] = mapped_column(ForeignKey("project.id"))
    instantiating_project: Mapped[Project] = relationship(back_populates="instantiated_project_execution")
    """
    Each ProjectConduct always is the execution of one Project.
    Each Project might have as execution one ProjectConduct.
    """
