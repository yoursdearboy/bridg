from typing import Optional

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from umdb.db import Base


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

    instantiated_project_execution: Mapped[Optional["ProjectConduct"]] = relationship(
        back_populates="instantiating_project"
    )
    """
    Each ProjectConduct always is the execution of one Project.
    Each Project might have as execution one ProjectConduct.
    """


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

    id: Mapped[int] = mapped_column(primary_key=True)
    kind: Mapped[str]

    instantiating_project_id: Mapped[int] = mapped_column(ForeignKey("project.id"))
    instantiating_project: Mapped[Project] = relationship(
        back_populates="instantiated_project_execution"
    )
    """
    Each ProjectConduct always is the execution of one Project.
    Each Project might have as execution one ProjectConduct.
    """


class ResearchProject(Project):
    """
    DEFINITION:
    A project that is intended to generate or test one or more hypotheses or lead to discoveries.

    EXAMPLE(S):
    A project to identify genetic biomarkers for cancer prognosis
    A phase 2 clinical trial to test whether an experimental treatment is effective.
    An epidemiological study to determine whether there is a correlation between an exposure and a disease.

    OTHER NAME(S):

    NOTE(S):
    """

    __mapper_args__ = {"polymorphic_identity": "research_project"}
