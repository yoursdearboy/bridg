from playwright.sync_api import Page, expect

from bridg import EntityName
from web.db import db


def test_person_showname(app, server, page: Page):
    url = app.url_for("person.name.edit", person_id=1, id=2)
    request = page.request.get(url)
    expect(request).to_be_ok()


def test_person_editname(app, server, page: Page):
    url = app.url_for("person.name.edit", person_id=1, id=2)
    request = page.request.get(url)
    expect(request).to_be_ok()


def test_person_editname_save(app, server, page: Page):
    src = {'id': 5, 'family': 'Trump',
           'given': 'Donald', 'middle': 'John', 'suffix': ''}
    url = app.url_for("person.name.edit", person_id=7, id=5)
    page.goto(url)
    page.locator("summary").click()
    page.locator("id=family").fill(src['family'])
    page.locator("id=given").fill(src['given'])
    page.locator("id=middle").fill(src['middle'])
    page.locator("id=suffix").fill(src['suffix'])
    page.get_by_text("Save").all()[1].click()
    with app.app_context():
        result = db.session.query(EntityName).filter_by(id=5).one()
        res = {'id': result.id, 'family': result.family, 'given': result.given,
               'middle': result.middle, 'suffix': result.suffix}
        assert src == res
