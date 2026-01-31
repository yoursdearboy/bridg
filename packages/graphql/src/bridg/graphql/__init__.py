import strawberry
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from strawchemy import Strawchemy, StrawchemyConfig

from bridg import alchemy
from bridg.common.env import load_env
from bridg.common.settings import load_settings

load_env()
settings = load_settings()
engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
session = sessionmaker(engine)

strawchemy = Strawchemy(
    StrawchemyConfig(
        "postgresql",
        session_getter=lambda _: session(),
    )
)


@strawchemy.type(
    alchemy.BiologicEntity,
    exclude=["identifier", "name"],
    override=True,
    scope="global",
)
class BiologicEntity:
    pass


@strawchemy.type(
    alchemy.BiologicEntityName,
    include=["id"],
    exclude=["biologic_entity"],
    override=True,
)
class BiologicEntityName:
    pass


@strawchemy.type(
    alchemy.Person,
    exclude=["performed_healthcare_provider", "identifier"],
)
class Person:
    pass


@strawberry.type
class Query:
    person: list[Person] = strawchemy.field()


schema = strawberry.Schema(query=Query)
