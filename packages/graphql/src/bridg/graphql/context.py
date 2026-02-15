from dataclasses import dataclass

from sqlalchemy.orm import Session
from starlette.requests import Request
from starlette.responses import Response
from starlette.websockets import WebSocket

from bridg.alchemy import TerminologyService

from .converter import Converter


@dataclass
class Context:
    request: Request | WebSocket
    response: Response | WebSocket
    converter: Converter
    session: Session
    terminology: TerminologyService
