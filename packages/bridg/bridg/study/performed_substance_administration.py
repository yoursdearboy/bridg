from .performed_procedure import PerformedProcedure


class PerformedSubstanceAdministration(PerformedProcedure):
    __mapper_args__ = {"polymorphic_identity": "substance_administration"}
