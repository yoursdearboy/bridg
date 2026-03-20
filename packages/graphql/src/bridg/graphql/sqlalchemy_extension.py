from typing import TYPE_CHECKING, Any, Callable

from sqlalchemy.orm import Session
from strawberry.extensions import SchemaExtension
from strawberry.types.graphql import OperationType
from strawberry.utils.await_maybe import AsyncIteratorOrIterator, AwaitableOrValue

from graphql import GraphQLResolveInfo

if TYPE_CHECKING:
    from .context import Context


def _need_to_be_flushed(session: Session):
    is_dirty = any(session.dirty)
    is_new = any(session.new)
    is_deleted = any(session.deleted)
    return is_dirty or is_new or is_deleted


class SQLAlchemyExtension(SchemaExtension):
    def resolve(
        self, _next: Callable[..., Any], root: Any, info: GraphQLResolveInfo, *args: str, **kwargs: Any
    ) -> AwaitableOrValue[object]:
        context: Context = self.execution_context.context
        session = context.session

        if _need_to_be_flushed(session):
            session.flush()

        return _next(root, info, *args, **kwargs)

    def on_execute(self) -> AsyncIteratorOrIterator[None]:
        context: Context = self.execution_context.context
        operation_type = self.execution_context.operation_type
        session = context.session

        try:
            if operation_type == OperationType.MUTATION:
                with session.begin():
                    yield
                    if not self.execution_context.pre_execution_errors:
                        session.commit()
                    else:
                        session.rollback()
            else:
                yield
        finally:
            session.close()
