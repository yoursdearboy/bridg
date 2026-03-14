import strawberry

from .common import (
    BiologicEntityMutation,
    PersonMutation,
    SubjectMutation,
)
from .study import (
    PerformedEncounterMutation,
    PerformedSpecimenCollectionMutation,
)


@strawberry.type
class Mutation(
    PerformedEncounterMutation,
    PerformedSpecimenCollectionMutation,
    SubjectMutation,
    PersonMutation,
    BiologicEntityMutation,
): ...
