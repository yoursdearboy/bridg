from polyfactory import Ignore

from bridg.alchemy.common import Study

from ..base import BaseFactory


class StudyFactory(BaseFactory[Study]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    kind = Ignore()
    # name
    # type
    # description

    instantiated_project_execution = Ignore()
