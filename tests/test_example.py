import time
import pytest
import socket
import os
import pdb
from playwright.sync_api import Page, expect, sync_playwright
from threading import Thread
from web.app import app

#  server_name = self.config.get("SERVER_NAME")
#  sn_host = sn_port = None

#  if server_name:
#     sn_host, _, sn_port = server_name.partition(":")
server_name = app.config["SERVER_NAME"]
print(server_name)

@pytest.fixture(scope="module")
def run_flask_app():
    app.run(use_reloader=False)


@pytest.fixture()
def run_flask_app_fixture():
    flask_thread = Thread(target=run_flask_app)
    flask_thread.start()
    pdb.breakpoint()
    time.sleep(10)  # Даем время на запуск приложения
    yield
    flask_thread.join()


def test_page_main(run_flask_app_fixture, page: Page):
    request = page.request.get(f"{server_name}/studies")
    expect(request).to_be_ok()


def test_page_sbj1(run_flask_app_fixture, page: Page):
    request = page.request.get(f"{server_name}/space/1/subjects/")
    expect(request).to_be_ok()


def test_page_sbj2(run_flask_app_fixture, page: Page):
    request = page.request.get(f"{server_name}/space/2/subjects/")
    expect(request).to_be_ok()


def test_page_sbj3(run_flask_app_fixture, page: Page):
    request = page.request.get(f"{server_name}/space/3/subjects/")
    expect(request).to_be_ok()


def test_page_sbjs1(run_flask_app_fixture, page: Page):
    request = page.request.get(f"{server_name}/space/1/subjects/1")
    expect(request).to_be_ok()


def test_page_sbjs2(run_flask_app_fixture, page: Page):
    request = page.request.get(f"{server_name}/space/1/subjects/2")
    expect(request).to_be_ok()


def test_page_sbjs3(run_flask_app_fixture, page: Page):
    request = page.request.get(f"{server_name}/space/3/subjects/3")
    expect(request).to_be_ok()


def test_search_form(run_flask_app_fixture, page: Page):
    page.goto(f"{server_name}/space/1/subjects/")
    expect(page.locator("a")).to_be_visible()


def test_search_button(run_flask_app_fixture, page: Page):
    page.goto(f"{server_name}/space/1/subjects/")
    expect(page.get_by_label("New")).to_be_visible()
