import re
from playwright.sync_api import Page, expect


def test_page_main(page: Page):
    request = page.request.get("http://localhost:5000/studies")
    expect(request).to_be_ok()


def test_page_sbj1(page: Page):
    request = page.request.get("http://localhost:5000/space/1/subjects/")
    expect(request).to_be_ok()


def test_page_sbj2(page: Page):
    request = page.request.get("http://localhost:5000/space/2/subjects/")
    expect(request).to_be_ok()


def test_page_sbj3(page: Page):
    request = page.request.get("http://localhost:5000/space/3/subjects/")
    expect(request).to_be_ok()


def test_page_sbjs1(page: Page):
    request = page.request.get("http://localhost:5000/space/1/subjects/1")
    expect(request).to_be_ok()


def test_page_sbjs2(page: Page):
    request = page.request.get("http://localhost:5000/space/1/subjects/2")
    expect(request).to_be_ok()


def test_page_sbjs3(page: Page):
    request = page.request.get("http://localhost:5000/space/3/subjects/3")
    expect(request).to_be_ok()
