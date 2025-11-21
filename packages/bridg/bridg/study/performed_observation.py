from __future__ import annotations

from typing import TYPE_CHECKING, List

from sqlalchemy.orm import Mapped, relationship

from .performed_activity import PerformedActivity

if TYPE_CHECKING:
    from .performed_observation_result import PerformedObservationResult


class PerformedObservation(PerformedActivity):
    __mapper_args__ = {"polymorphic_identity": "observation"}

    resulted_performed_observation_result: Mapped[List[PerformedObservationResult]] = relationship(
        back_populates="producing_performed_observation",
        cascade="all, delete-orphan",
    )
    """
    Each PerformedObservationResult always is a result of one PerformedObservation.
    Each PerformedObservation might result in one or more PerformedObservationResult.
    """
