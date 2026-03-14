import strawberry

from .biospecimen import (
    SpecimenQuery,
)
from .common import (
    PersonQuery,
    SubjectQuery,
)
from .study import (
    PerformedActivityQuery,
    PerformedEncounterQuery,
    PerformedSpecimenCollectionQuery,
)


@strawberry.type
class Query(
    PerformedSpecimenCollectionQuery,
    PerformedEncounterQuery,
    PerformedActivityQuery,
    SpecimenQuery,
    SubjectQuery,
    PersonQuery,
): ...
