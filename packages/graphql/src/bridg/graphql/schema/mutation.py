import strawberry

from .common import (
    BiologicEntityMutation,
    PersonMutation,
    SubjectMutation,
)
from .study import (
    PerformedActivityMutation,
    PerformedEncounterMutation,
    PerformedSpecimenCollectionMutation,
)


@strawberry.type
class Mutation(
    PerformedEncounterMutation,
    PerformedSpecimenCollectionMutation,
    PerformedActivityMutation,
    SubjectMutation,
    PersonMutation,
    BiologicEntityMutation,
): ...
