from dataclasses import dataclass
from typing import overload

from flask import Flask, g


@dataclass
class Breadcrumb:
    url: str | None
    text: str


class Breadcrumbs:
    def __init__(self, app: Flask | None = None):
        if app is not None:
            self.init_app(app)

    def init_app(self, app: Flask):
        app.before_request(self.init_breadcrumbs)
        app.context_processor(self._context_processor)

    def init_breadcrumbs(self):
        g.breadcrumbs = []

    @property
    def _breadcrumbs(self):
        return g.breadcrumbs

    @overload
    def append(self, arg: Breadcrumb): ...

    @overload
    def append(self, arg: str, text: str): ...

    def append(self, arg: Breadcrumb | str, text: str | None = None):
        if isinstance(arg, Breadcrumb):
            self._breadcrumbs.append(arg)
        elif isinstance(arg, str):
            if text is None:
                raise ValueError("No breadcrumb text")
            self._breadcrumbs.append(Breadcrumb(arg, text))
        else:
            raise ValueError("Unknown breadcrumb type")

    def extend(self, *bs: Breadcrumb):
        self._breadcrumbs.extend(bs)

    def _context_processor(self):
        return dict(breadcrumbs=self._breadcrumbs)


breadcrumbs = Breadcrumbs()
