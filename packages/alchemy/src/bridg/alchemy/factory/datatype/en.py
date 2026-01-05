from polyfactory import Use

from bridg.alchemy import EntityName

from ..base import BaseFactory


class EntityNameFactory[T: EntityName](BaseFactory[T]):
    __is_base_factory__ = True

    use = None
    family = Use(BaseFactory.__faker__.last_name)
    given = Use(BaseFactory.__faker__.first_name)
    middle = None
    patronymic = None
    prefix = None
    suffix = None
