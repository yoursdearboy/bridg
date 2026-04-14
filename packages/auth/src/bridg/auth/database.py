from typing import Optional
from uuid import UUID, uuid4

from sqlalchemy.orm import Mapped, Session, mapped_column

from bridg.alchemy import Base


class User(Base):
    __tablename__ = "user"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    username: Mapped[str] = mapped_column(unique=True)
    hashed_password: Mapped[Optional[str]]
    is_active: Mapped[bool] = mapped_column(default=True)


def find_user(session: Session, username: str, password: str) -> Optional[User]:
    hashed_password = password
    query = session.query(User).filter(
        User.username == username,
        User.hashed_password == hashed_password,
        User.is_active.is_(True),
    )
    return query.one_or_none()
