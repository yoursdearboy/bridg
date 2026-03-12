from typing import List

import strawberry

import bridg.alchemy

from ..biospecimen import Specimen
from .performed_activity import PerformedActivityInterface


@strawberry.type
class PerformedSpecimenCollection(PerformedActivityInterface):
    produced_specimen: List[Specimen]

    @staticmethod
    def is_type_of(obj, _) -> bool:
        return isinstance(obj, bridg.alchemy.PerformedSpecimenCollection)
