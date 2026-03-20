from strawberry import Schema
from strawberry.schema.config import StrawberryConfig

from ..sqlalchemy_extension import SQLAlchemyExtension
from .mutation import Mutation
from .query import Query
from .scalar import SCALAR_REGISTRY
from .study import PerformedActivity, PerformedEncounter, PerformedSpecimenCollection

schema = Schema(
    query=Query,
    mutation=Mutation,
    config=StrawberryConfig(scalar_map=SCALAR_REGISTRY),
    extensions=[SQLAlchemyExtension()],
    types=[PerformedEncounter, PerformedSpecimenCollection, PerformedActivity],
)
