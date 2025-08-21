from .defined_procedure import DefinedProcedure


class DefinedSubstanceAdministration(DefinedProcedure):
    __mapper_args__ = {"polymorphic_identity": "substance_administration"}
