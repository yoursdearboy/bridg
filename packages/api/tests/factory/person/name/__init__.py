import bridg
from polyfactory import Ignore, Use

from tests.factory.base import BaseFactory


class EntityNameFactory(BaseFactory[bridg.EntityName]):
    __set_as_default_factory_for_type__ = True

    id = Ignore()
    use = None
    family = Use(BaseFactory.__faker__.last_name)
    given = Use(BaseFactory.__faker__.first_name)
    middle = None
    patronymic = None
    prefix = None
    suffix = None
