from bridg.graphql.schema import PersonInput

from .biologic_entity import BiologicEntityInputBaseFactory


class PersonInputFactory(BiologicEntityInputBaseFactory[PersonInput]):
    type = "person"
