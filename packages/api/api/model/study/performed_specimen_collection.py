from typing import Optional

import bridg

from ..biospecimen import Specimen, SpecimenData
from .performed_procedure import PerformedProcedure, PerformedProcedureData


class PerformedSpecimenCollection(PerformedProcedure[bridg.PerformedSpecimenCollection]):
    produced_specimen: Optional[Specimen]


class PerformedSpecimenCollectionData(PerformedProcedureData[bridg.PerformedSpecimenCollection]):
    produced_specimen: Optional[SpecimenData]
