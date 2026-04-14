from typing import Optional
from uuid import UUID, uuid4

import bcrypt
from sqlalchemy.orm import Mapped, Session, mapped_column

from bridg.alchemy import Base


class User(Base):
    __tablename__ = "user"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    username: Mapped[str] = mapped_column(unique=True)
    hashed_password: Mapped[Optional[str]]
    is_active: Mapped[bool] = mapped_column(default=True)


def _hash_password(x: str) -> str:
    return bcrypt.hashpw(x.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def _check_password(x: str, hash: str) -> bool:
    return bcrypt.checkpw(x.encode("utf-8"), hash.encode("utf-8"))


def find_user(session: Session, username: str, password: str) -> Optional[User]:
    query = session.query(User).filter(
        User.username == username,
        User.is_active.is_(True),
    )

    if user := query.one_or_none():
        if user.hashed_password and _check_password(password, user.hashed_password):
            return user


def create_user(session: Session, username: str, password: str):
    hashed_password = _hash_password(password)
    user = User(username=username, hashed_password=hashed_password)
    session.add(user)
    session.commit()
