from polyfactory import Ignore, Use

from bridg.graphql.schema import ActivityInput

from ..base import BaseFactory
from ..datatype import ConceptDescriptorFactory
from ..maybe import make_some


class ActivityInputFactory[T: ActivityInput](BaseFactory[T]):
    __is_base_factory__ = True

    reason_code = Use(make_some(ConceptDescriptorFactory.build))
    comment = Use(make_some(BaseFactory.__faker__.text))
    using_project_id = Ignore()
    context_for_study_site_id = Ignore()
