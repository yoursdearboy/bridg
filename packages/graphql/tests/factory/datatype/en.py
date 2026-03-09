from polyfactory import Use

from bridg.graphql.datatype import EntityNameInput

from ..base import BaseFactory
from ..maybe import make_some


class EntityNameInputFactory[T: EntityNameInput](BaseFactory[T]):
    __is_base_factory__ = True

    use = None
    family = Use(make_some(BaseFactory.__faker__.last_name))
    given = Use(make_some(BaseFactory.__faker__.first_name))
    middle = None
    patronymic = None
    prefix = None
    suffix = None
