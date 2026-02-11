from dataclasses import dataclass

from sqlalchemy.orm import Session
from starlette.requests import Request
from starlette.responses import Response
from starlette.websockets import WebSocket

from bridg.alchemy import TerminologyService
from bridg.common.converter import Context as ConverterContext


@dataclass
class Context(ConverterContext):
    request: Request | WebSocket
    response: Response | WebSocket
    session: Session
    terminology: TerminologyService
