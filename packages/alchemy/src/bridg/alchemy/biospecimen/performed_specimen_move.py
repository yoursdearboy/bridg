from ..study import PerformedAdministrativeActivity


class PerformedSpecimenMove(PerformedAdministrativeActivity):
    __mapper_args__ = {"polymorphic_identity": "specimen_move"}
