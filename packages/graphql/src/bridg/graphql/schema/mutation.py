import strawberry

from .biospecimen import (
    PerformedSpecimenMoveMutation,
)
from .common import (
    BiologicEntityMutation,
    PersonMutation,
    StudySubjectMutation,
    SubjectMutation,
)
from .study import (
    PerformedActivityMutation,
    PerformedEncounterMutation,
    PerformedObservationMutation,
    PerformedSpecimenCollectionMutation,
)


@strawberry.type
class Mutation(
    PerformedSpecimenMoveMutation,
    PerformedSpecimenCollectionMutation,
    PerformedObservationMutation,
    PerformedEncounterMutation,
    PerformedActivityMutation,
    StudySubjectMutation,
    SubjectMutation,
    PersonMutation,
    BiologicEntityMutation,
): ...
