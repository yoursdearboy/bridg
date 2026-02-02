import strawberry

from .biologic_entity import BiologicEntity


@strawberry.type
class Person(BiologicEntity):
    pass
