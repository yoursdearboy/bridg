from datetime import datetime
from typing import List, Optional
from uuid import UUID, uuid4

import bcrypt
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, Session, mapped_column, relationship

from bridg.alchemy import Base


class User(Base):
    __tablename__ = "user"

    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4)
    username: Mapped[str] = mapped_column(unique=True)
    hashed_password: Mapped[Optional[str]]
    is_active: Mapped[bool] = mapped_column(default=True)
    token: Mapped[List["Token"]] = relationship(back_populates="user")


class Token(Base):
    __tablename__ = "token"

    token: Mapped[str] = mapped_column(primary_key=True)
    user: Mapped[User] = relationship(back_populates="token")
    user_id: Mapped[UUID] = mapped_column(ForeignKey("user.id"))
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=datetime.now)


def _hash_password(x: str) -> str:
    return bcrypt.hashpw(x.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def _check_password(x: str, hash: str) -> bool:
    return bcrypt.checkpw(x.encode("utf-8"), hash.encode("utf-8"))


def find_user_by_credentials(session: Session, username: str, password: str) -> Optional[User]:
    query = session.query(User).filter(
        User.username == username,
        User.is_active.is_(True),
    )

    if user := query.one_or_none():
        if user.hashed_password and _check_password(password, user.hashed_password):
            return user


def find_user_by_token(session: Session, token: str) -> Optional[User]:
    return session.query(User).filter(User.token.any(Token.token == token)).one_or_none()


def create_user(session: Session, username: str, password: str | None):
    hashed_password = _hash_password(password) if password else None
    user = User(username=username, hashed_password=hashed_password)
    session.add(user)
    session.commit()


def add_token(session: Session, token: str, user_id: UUID):
    obj = Token(token=token, user_id=user_id)
    session.add(obj)
    session.commit()
