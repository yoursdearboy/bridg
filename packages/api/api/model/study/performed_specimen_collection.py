from typing import Optional

import bridg

from ..biospecimen import Specimen
from .performed_procedure import PerformedProcedure


class PerformedSpecimenCollection(PerformedProcedure[bridg.PerformedSpecimenCollection]):
    produced_specimen: Optional[Specimen]
