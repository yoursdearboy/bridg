from typing import Annotated, List
from uuid import UUID

import bridg
from bridg import Repository
from fastapi import APIRouter, Depends, HTTPException

from api.db import get_repository
from api.model import ConceptDescriptor

router = APIRouter(prefix="/code_system", tags=["value_set"])


class CodeSystemRepository(Repository[bridg.CodeSystem]):
    _sa = bridg.CodeSystem


CodeSystemRepositoryDep = Annotated[CodeSystemRepository, Depends(get_repository(CodeSystemRepository))]


# FIXME: expand should be done through ValueSet, not CodeSystem directly
@router.get("/{code_system_id:uuid}/$expand")
def expand(code_system_id: UUID, repo: CodeSystemRepositoryDep) -> List[ConceptDescriptor]:
    print(code_system_id)
    if obj := repo.one_or_none(code_system_id):
        return [ConceptDescriptor.model_validate(c) for c in obj.concept]
    raise HTTPException(status_code=404)
