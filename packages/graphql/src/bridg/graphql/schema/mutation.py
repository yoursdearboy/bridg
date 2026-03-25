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
    PerformedSpecimenCollectionMutation,
)


@strawberry.type
class Mutation(
    PerformedSpecimenMoveMutation,
    PerformedSpecimenCollectionMutation,
    PerformedEncounterMutation,
    PerformedActivityMutation,
    StudySubjectMutation,
    SubjectMutation,
    PersonMutation,
    BiologicEntityMutation,
): ...
