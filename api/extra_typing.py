from uuid import UUID


def intersection_type(*bases):
    name = "".join(b.__name__ for b in bases)
    return type(name, bases, {})


class WithId:
    id: UUID


def with_id(*bases):
    return intersection_type(*bases, WithId)
