from sqlalchemy.orm import configure_mappers

try:
    from sqlalchemy_continuum import make_versioned
    from sqlalchemy_continuum.plugins import Plugin

    from bridg.auth import AuthenticatedUser, User

    from .user import get_user

    class UserPlugin(Plugin):
        def transaction_args(self, uow, session):
            auth_user = get_user()
            user_id = auth_user.user.id if isinstance(auth_user, AuthenticatedUser) else None
            return {
                "user_id": user_id,
            }

    make_versioned(user_cls=User, plugins=[UserPlugin()])  # type: ignore

    from bridg.alchemy import *  # type: ignore # noqa: F403

    configure_mappers()
except ImportError:
    pass
