try:
    from sqlalchemy_continuum import make_versioned

    from bridg.auth import User

    make_versioned(user_cls=User)  # type: ignore
except ImportError:
    pass
