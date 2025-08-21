from __future__ import annotations

from typing import TYPE_CHECKING, List

from sqlalchemy.orm import Mapped, relationship

from .defined_activity import DefinedActivity

if TYPE_CHECKING:
    from .defined_observation_result import DefinedObservationResult


class DefinedObservation(DefinedActivity):
    __mapper_args__ = {"polymorphic_identity": "observation"}

    produced_defined_observation_result: Mapped[List[DefinedObservationResult]] = relationship(
        back_populates="producing_defined_observation"
    )
    """
    Each DefinedObservationResult always is a result of one DefinedObservation.
    Each DefinedObservation might result in one or more DefinedObservationResult.
    """
