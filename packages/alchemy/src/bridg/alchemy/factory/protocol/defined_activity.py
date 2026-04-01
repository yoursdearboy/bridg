from datetime import timezone

from polyfactory import Ignore, Use

from bridg.alchemy import DefinedActivity

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory


class DefinedActivityBaseFactory[T: DefinedActivity](BaseFactory[T]):
    __is_base_factory__ = True

    id = Ignore()
    type = Ignore()

    reason_code_id = Ignore()
    reason_code = Ignore()

    comment = None

    using_project_id = Ignore()
    using_project = Ignore()

    context_for_study_site_id = Ignore()
    context_for_study_site = Ignore()

    name_code_id = Ignore()
    name_code = ConceptDescriptorFactory

    category_code_id = Ignore()
    category_code = ConceptDescriptorFactory

    subcategory_code_id = Ignore()
    subcategory_code = ConceptDescriptorFactory

    description = Use(lambda: BaseFactory.__faker__.text())

    status_code_id = Ignore()
    status_code = ConceptDescriptorFactory

    status_date = Use(lambda: BaseFactory.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc))

    using_study_activity = Ignore()


class DefinedActivityFactory(DefinedActivityBaseFactory[DefinedActivity]):
    __set_as_default_factory_for_type__ = True
