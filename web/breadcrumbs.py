from dataclasses import dataclass
from typing import overload

from flask import Flask, g


@dataclass
class Breadcrumb:
    url: str
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
    def append(self, b: Breadcrumb): ...

    @overload
    def append(self, *, url: str, text: str): ...

    def append(
        self,
        b: Breadcrumb | None = None,
        url: str | None = None,
        text: str | None = None,
    ):
        if b:
            self._breadcrumbs.append(b)
        elif url and text:
            self._breadcrumbs.append(Breadcrumb(url, text))

    def extend(self, *bs: Breadcrumb):
        self._breadcrumbs.extend(bs)

    def _context_processor(self):
        return dict(breadcrumbs=self._breadcrumbs)


breadcrumbs = Breadcrumbs()
