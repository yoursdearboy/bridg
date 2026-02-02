from dataclasses import dataclass

from sqlalchemy.orm import Session
from starlette.requests import Request
from starlette.responses import Response
from starlette.websockets import WebSocket


@dataclass
class Context:
    request: Request | WebSocket
    response: Response | WebSocket
    session: Session
