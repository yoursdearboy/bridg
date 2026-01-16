from typing import Annotated, List

from fastapi import APIRouter, Depends

import bridg.alchemy
from bridg.alchemy import Repository
from bridg.api.db import get_repository
from bridg.api.model import ConceptDescriptor

router = APIRouter(prefix="/code_system", tags=["code_system"])


class ConceptDescriptorRepository(Repository[bridg.alchemy.ConceptDescriptor]):
    _sa = bridg.alchemy.ConceptDescriptor


ConceptDescriptorRepositoryDep = Annotated[
    ConceptDescriptorRepository, Depends(get_repository(ConceptDescriptorRepository))
]


# FIXME: expand should be done through ValueSet, not CodeSystem directly
@router.get("/{code_system:str}/$expand", operation_id="expand_code_system")
def expand(code_system: str, repo: ConceptDescriptorRepositoryDep) -> List[ConceptDescriptor]:
    return [ConceptDescriptor.model_validate(c) for c in repo.all(code_system=code_system)]
