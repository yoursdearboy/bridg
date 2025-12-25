from datetime import timezone
from typing import Any, Callable, TypeVar

from polyfactory.factories.sqlalchemy_factory import SQLAlchemyFactory

from bridg import Base, TZDateTime

T = TypeVar("T", bound=Base)


class BaseFactory(SQLAlchemyFactory[T]):
    __is_base_factory__ = True
    __set_relationships__ = True
    __set_association_proxy__ = True
    __check_model__ = True

    @classmethod
    def get_sqlalchemy_types(cls) -> dict[Any, Callable[[], Any]]:
        types = super().get_sqlalchemy_types()
        return {
            **types,
            TZDateTime: lambda: cls.__faker__.date_time_this_century(after_now=True, tzinfo=timezone.utc),
        }
