from nicegui import ui

from umdb.app import layout


@ui.page("/")
def home():
    layout.header(layout.nav)
    ui.label("Welcome, stranger")
