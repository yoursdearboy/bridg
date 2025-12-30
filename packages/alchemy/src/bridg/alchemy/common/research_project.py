from __future__ import annotations

from .project import Project


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
