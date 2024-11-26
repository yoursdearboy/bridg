import datetime
import re

from playwright.sync_api import Page, expect

from bridg import AdministrativeGender, EntityName, Person, StudySubject
from web.db import db


def test_person_show(app, server, page: Page):
    url = app.url_for("person.show", id='1')
    request = page.request.get(url)
    expect(request).to_be_ok()


def test_person_edit(app, server, page: Page):
    url = app.url_for("person.edit", id='1')
    request = page.request.get(url)
    expect(request).to_be_ok()


def test_person_showname(app, server, page: Page):
    url = app.url_for("person.name.edit", person_id=1, id=2)
    request = page.request.get(url)
    expect(request).to_be_ok()


def test_person_editname(app, server, page: Page):
    url = app.url_for("person.name.edit", person_id=1, id=2)
    request = page.request.get(url)
    expect(request).to_be_ok()


def test_test(app, server, page: Page):
    url = app.url_for("person.edit", id=7)
    page.goto(url)
    page.locator("id=administrative_gender_code").select_option("male")
    page.locator("id=death_indicator").select_option("false")
    page.locator("id=birth_date").fill("1991-01-01")
    page.get_by_text("Save").all()[1].click()
    data = {'id': 7, 'administrative_gender_code': AdministrativeGender.male,
            'death_indicator': False, 'birth_date': datetime.date(1991, 1, 1)}
    with app.app_context():
        result = db.session.query(Person).filter_by(id=7).one()
    bool = (data['id'] == result.id) & (data['administrative_gender_code'] == result.administrative_gender_code) & (data[
        'death_indicator'] == result.death_indicator) & (data['birth_date'] == result.birth_date)
    assert bool


def test_person_editname_save(app, server, page: Page):
    url = app.url_for("person.name.edit", person_id=7, id=5)
    page.goto(url)
    page.locator("summary").click()
    page.locator("id=family").fill("Trump")
    page.locator("id=given").fill("Donald")
    page.locator("id=middle").fill("John")
    page.locator("id=suffix").fill("")
    page.get_by_text("Save").all()[1].click()
    data = {'id': 5, 'family': 'Trump',
            'given': 'Donald', 'middle': 'John', 'suffix': ''}
    with app.app_context():
        result = db.session.query(EntityName).filter_by(id=5).one()
    bool = (data['id'] == result.id) & (data['family'] == result.family) & (data[
        'given'] == result.given) & (data['middle'] == result.middle) & (data['suffix'] == result.suffix)
    assert bool


def test_new_person(app, server, page: Page):
    data = {'id': 1, 'family': 'Test', 'given': 'Test', 'gender': 'M', 'administrative_gender_code': AdministrativeGender.male, 'death_indicator': False,
            'birth_date': datetime.date(1991, 1, 1), 'assigned_study_site_protocol_version_relationship': 'DGOI in AML-MRD-2018'}
    url = app.url_for("subject.new", space_id=data['id'])
    page.goto(url)
    page.locator(
        "id=performing_biologic_entity-name-0-family").fill(data['family'])
    page.locator(
        "id=performing_biologic_entity-name-0-given").fill(data['given'])
    page.locator(
        "id=performing_biologic_entity-administrative_gender_code").select_option(data['gender'])
    page.locator(
        "id=performing_biologic_entity-death_indicator").select_option(data['death_indicator'])
    page.locator(
        "id=performing_biologic_entity-birth_date").fill(data['birth_date'].strftime('%Y-%m-%d'))
    page.locator('span').all()[1].click()
    page.wait_for_load_state()
    page.locator("li").filter(has_text="DGOI in AML-MRD-2018").click()
    page.get_by_text("Save").all()[1].click()
    currentUrl = page.url
    regex = r'/subjects/(\d+)$'
    currentId = re.search(regex, currentUrl)[1]
    print(currentId)
    with app.app_context():
        subject = db.session.query(StudySubject).filter_by(id=currentId).one()
    print(subject)
    print(subject.status)
    print(subject.person.name.family)
# bool = (data['family'] == subject.person.name.family) & (data['given'] == subject.person.name.given) & (
#     data['administrative_gender_code'] == subject.person.administrative_gender_code) & (
#     data['death_indicator'] == subject.person.death_indicator) & (data['birth_date'] == subject.person.birth_date) & (
#     data['assigned_study_site_protocol_version_relationship'] == subject.assigned_study_site_protocol_version_relationship)
# assert bool
