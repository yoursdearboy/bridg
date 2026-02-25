from strawberry import Schema
from strawberry.schema.config import StrawberryConfig

from .mutation import Mutation
from .query import Query
from .scalar import SCALAR_REGISTRY

schema = Schema(
    query=Query,
    mutation=Mutation,
    config=StrawberryConfig(scalar_map=SCALAR_REGISTRY),
)
