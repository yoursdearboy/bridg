from typing import List, Self

# Commented till required
# Because sqlalchemy-continuum is an optional dependency,
# it must be in a separate optional module

# class HasTransaction:
#     transaction: TransactionBase


# def has_transaction(x: Any) -> TypeGuard[HasTransaction]:
#     return hasattr(x, "transaction")


class VersionedMixin:
    __versioned__ = {}

    # FIXME: type as Self & HasTransaction
    # till intersection is not supported (see https://github.com/python/typing/issues/213), use
    # if has_transaction(ver):
    #   ver.transaction
    versions: List[Self]
