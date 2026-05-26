from sqlalchemy.orm import configure_mappers

try:
    from sqlalchemy_continuum import make_versioned  # noqa: I001

    from bridg.auth import User

    make_versioned(user_cls=User)  # type: ignore

    from bridg.alchemy import *  # type: ignore # noqa: F403

    configure_mappers()
except ImportError:
    pass
