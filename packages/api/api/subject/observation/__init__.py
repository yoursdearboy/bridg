from datetime import datetime
from typing import Annotated, List, Optional
from uuid import UUID

import bridg
from bridg.repository import Repository
from fastapi import APIRouter, Depends
from pydantic import Field, computed_field

from api.base_model import BaseModel, Code
from api.db import get_repository

from . import result

router = APIRouter(prefix="/observation", tags=["observation"])


class PerformedObservation(BaseModel):
    class StudySite(BaseModel):
        id: UUID
        performing_healthcare_facility: Optional[bridg.HealthcareFacility] = Field(exclude=True)
        performing_organization: Optional[bridg.Organization] = Field(exclude=True)

        @property
        def performing_entity(self):
            if self.performing_healthcare_facility:
                return self.performing_healthcare_facility
            if self.performing_organization:
                return self.performing_organization
            raise RuntimeError("A study site must have a project")

        @computed_field
        @property
        def label(self) -> str:
            return str(self.performing_entity)

    class Epoch(BaseModel):
        id: UUID
        name: Optional[str]
        type_code: Optional[str]
        description: Optional[str]

    class DefinedActivity(BaseModel):
        id: UUID
        name_code: Code
        category_code: Optional[Code]
        subcategory_code: Optional[Code]
        description: Optional[str]

    id: UUID
    reason_code: Optional[Code]
    status_code: Optional[Code]
    status_date: Optional[datetime]
    context_for_study_site: Optional[StudySite]
    containing_epoch: Optional[Epoch]
    instantiated_defined_activity: Optional[DefinedActivity]


class ObservationRepository(Repository[bridg.PerformedObservation]):
    _sa = bridg.PerformedObservation


ObservationRepositoryDep = Annotated[ObservationRepository, Depends(get_repository(ObservationRepository))]


@router.get("")
def index(space_id: UUID, subject_id: UUID, repo: ObservationRepositoryDep) -> List[PerformedObservation]:
    objs = repo.all(bridg.PerformedObservation.involved_subject_id == subject_id)
    return [PerformedObservation.model_validate(obj) for obj in objs]


router.include_router(result.router, prefix="/{obs_id:uuid}")

openapi_tags = [{"name": "observation"}, *result.openapi_tags]
