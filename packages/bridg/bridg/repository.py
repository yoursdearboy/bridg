from typing import Generic, Iterable, List, Optional, TypeVar
from uuid import UUID

from sqlalchemy.orm import Session

from . import Base

T = TypeVar("T", bound=Base)


class Repository(Generic[T]):
    _sa: type[T]

    def __init__(self, db: Session) -> None:
        self.db = db

    def _query(self):
        return self.db.query(self._sa)

    def _query_one(self, id: UUID):
        return self._query().filter_by(id=id)

    def all(self, *args, **kwargs) -> Iterable[T]:
        q = self._query()
        if args:
            q = q.filter(*args)
        if kwargs:
            q = q.filter_by(**kwargs)
        return q

    def one(self, id: UUID) -> T:
        return self._query_one(id).one()

    def one_or_none(self, id: UUID) -> Optional[T]:
        return self._query_one(id).one_or_none()

    def create(self, obj: T, commit=True) -> T:
        self.db.add(obj)
        if commit:
            self.db.commit()
        return obj

    def update(self, obj: T, commit=True) -> T:
        obj = self.db.merge(obj)
        if commit:
            self.db.commit()
        return obj

    def delete(self, id: UUID, commit=True):
        self._query_one(id).delete()
        if commit:
            self.db.commit()

    def exists(self, id: UUID) -> bool:
        return self.db.query(self._query_one(id).exists()).scalar()
