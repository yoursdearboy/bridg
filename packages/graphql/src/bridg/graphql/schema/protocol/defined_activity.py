from datetime import datetime
from typing import Optional

import strawberry

from ..common import Activity
from ..datatype import ConceptDescriptor


@strawberry.type
class DefinedActivity(Activity):
    id: strawberry.ID
    name_code: Optional[ConceptDescriptor]
    category_code: Optional[ConceptDescriptor]
    subcategory_code: Optional[ConceptDescriptor]
    description: Optional[str]
    status_code: Optional[ConceptDescriptor]
    status_date: Optional[datetime]
