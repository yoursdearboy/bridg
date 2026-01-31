from fastapi import APIRouter

from . import performed_activity, performed_specimen_collection

router = APIRouter(prefix="/subject")

router.include_router(performed_activity.router, prefix="/{subject_id:uuid}")
router.include_router(performed_specimen_collection.router, prefix="/{subject_id:uuid}")
