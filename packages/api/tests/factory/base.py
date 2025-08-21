from typing import TypeVar

from bridg.db import Base
from polyfactory.factories.sqlalchemy_factory import SQLAlchemyFactory

T = TypeVar("T", bound=Base)


class BaseFactory(SQLAlchemyFactory[T]):
    __is_base_factory__ = True
    __set_relationships__ = False
    __set_association_proxy__ = False
    __check_model__ = True
