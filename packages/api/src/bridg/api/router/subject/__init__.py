from fastapi import APIRouter

from . import performed_activity, specimen

router = APIRouter(prefix="/subject")

router.include_router(performed_activity.router, prefix="/{subject_id:uuid}")
router.include_router(specimen.router, prefix="/{subject_id:uuid}")
