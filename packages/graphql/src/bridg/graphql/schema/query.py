import strawberry

from .biospecimen import (
    SpecimenQuery,
)
from .code_system import CodeSystemQuery
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
    CodeSystemQuery,
): ...
