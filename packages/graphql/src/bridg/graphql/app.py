from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from strawberry.asgi import GraphQL

from bridg.alchemy import TerminologyService
from bridg.common.env import load_env
from bridg.common.settings import load_settings

from .context import Context
from .converter import converter
from .schema import schema

load_env()
settings = load_settings()
engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
Session = sessionmaker(engine)


class App(GraphQL):
    async def get_context(self, request, response=None) -> Context:
        session = Session()
        terminology = TerminologyService(session)
        return Context(
            request=request,
            response=response,
            session=session,
            convert=converter.convert,
            terminology=terminology,
        )


app = App(schema)
