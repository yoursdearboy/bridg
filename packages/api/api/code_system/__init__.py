from typing import Annotated, List

import bridg
from bridg import Repository
from fastapi import APIRouter, Depends

from api.db import get_repository
from api.model.datatypes import ConceptDescriptor

router = APIRouter(prefix="/code_system", tags=["value_set"])


class ConceptDescriptorRepository(Repository[bridg.ConceptDescriptor]):
    _sa = bridg.ConceptDescriptor


ConceptDescriptorRepositoryDep = Annotated[
    ConceptDescriptorRepository, Depends(get_repository(ConceptDescriptorRepository))
]


# FIXME: expand should be done through ValueSet, not CodeSystem directly
@router.get("/{code_system:str}/$expand")
def expand(code_system: str, repo: ConceptDescriptorRepositoryDep) -> List[ConceptDescriptor]:
    return [ConceptDescriptor.model_validate(c) for c in repo.all(code_system=code_system)]
