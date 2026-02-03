import strawberry

from .biologic_entity import BiologicEntity, BiologicEntityInput


@strawberry.type
class Person(BiologicEntity):
    pass


@strawberry.input
class PersonInput(BiologicEntityInput):
    pass
