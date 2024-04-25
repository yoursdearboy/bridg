from attr import dataclass
from nicegui import ui


@dataclass
class NavItem:
    title: str
    url: str


nav: list[NavItem] = [NavItem("Database", "/"), NavItem("Persons", "/persons/")]


def header(nav: list[NavItem]):
    CLASSES = "text-white text-xl font-medium no-underline"
    with ui.header(elevated=True):
        for n in nav:
            ui.link(n.title, n.url).classes(CLASSES)
