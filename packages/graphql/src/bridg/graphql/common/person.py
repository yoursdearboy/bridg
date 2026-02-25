import strawberry

from .biologic_entity import BiologicEntity, BiologicEntityInput, BiologicEntityLookup


@strawberry.type
class Person(BiologicEntity):
    pass


@strawberry.input
class PersonLookup(BiologicEntityLookup):
    pass


@strawberry.input
class PersonInput(BiologicEntityInput):
    pass
