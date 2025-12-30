from polyfactory import Ignore

from bridg.protocol import StudyProtocol

from ..base import BaseFactory


class StudyProtocolFactory(BaseFactory[StudyProtocol]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()

    # planned_study
