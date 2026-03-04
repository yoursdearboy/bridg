import strawberry

from .biologic_entity import BiologicEntity, BiologicEntityFilter, BiologicEntityInput


@strawberry.type
class Person(BiologicEntity):
    pass


@strawberry.input
class PersonFilter(BiologicEntityFilter):
    pass


@strawberry.input
class PersonInput(BiologicEntityInput):
    pass
