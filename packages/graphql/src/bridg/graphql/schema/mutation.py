import strawberry

from .common import (
    BiologicEntityMutation,
    PersonMutation,
    StudySubjectMutation,
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
    StudySubjectMutation,
    SubjectMutation,
    PersonMutation,
    BiologicEntityMutation,
): ...
