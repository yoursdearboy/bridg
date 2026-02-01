import strawberry
from strawchemy import ModelInstance

from bridg import alchemy

from ..strawchemy import strawchemy


@strawchemy.type(
    alchemy.BiologicEntityName,
    include={"use", "family", "given", "middle", "patronymic", "prefix", "suffix"},
    scope="global",
)
class BiologicEntityName:
    pass


@strawberry.type
class InstanceIdentifier:
    root: str
    extension: str | None


@strawchemy.type(
    alchemy.BiologicEntityIdentifier,
    include={"id", "identifier_type_code"},
    scope="global",
)
class BiologicEntityIdentifier:
    instance: ModelInstance[alchemy.BiologicEntityIdentifier]

    @strawchemy.field
    def identifier(self) -> InstanceIdentifier:
        return InstanceIdentifier(
            root=self.instance.identifier.root,
            extension=self.instance.identifier.extension,
        )


@strawchemy.type(
    alchemy.BiologicEntity,
    include={
        "id",
        "type",
        "administrative_gender_code",
        "birth_date",
        "death_date",
        "death_date_estimated_indicator",
        "death_indicator",
        "identifier",
        "name",
    },
    scope="global",
)
class BiologicEntity:
    pass
