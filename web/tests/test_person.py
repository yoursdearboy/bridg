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


def test_new_person(app, server, page: Page):
    src = {'family': 'Test',
           'given': 'Test',
           'administrative_gender_code': "M",
           'death_indicator': False,
           'birth_date': datetime.date(1991, 1, 1),
           'assigned_study_site_protocol_version_relationship': 'DGOI in AML-MRD-2018'}
    url = app.url_for("subject.new", space_id=1)
    page.goto(url)
    page.locator(
        "id=performing_biologic_entity-name-0-family").fill(src['family'])
    page.locator(
        "id=performing_biologic_entity-name-0-given").fill(src['given'])
    page.locator(
        "id=performing_biologic_entity-administrative_gender_code").select_option(src['administrative_gender_code'])
    page.locator(
        "id=performing_biologic_entity-death_indicator").select_option(str(src['death_indicator']).lower())
    page.locator(
        "id=performing_biologic_entity-birth_date").fill(src['birth_date'].strftime('%Y-%m-%d'))
    page.locator('span').all()[1].click()
    page.wait_for_load_state()
    page.locator("li").filter(
        has_text=src['assigned_study_site_protocol_version_relationship']).click()
    page.get_by_text("Save").all()[1].click()
    global current_url
    global current_id
    current_url = page.url
    current_id = re.search(r'/subjects/(\d+)$', current_url)[1]
    with app.app_context():
        subject = db.session.query(StudySubject).filter_by(id=current_id).one()
        res = {
            'family': subject.performing_biologic_entity.name[0].family,
            'given': subject.performing_biologic_entity.name[0].given,
            'administrative_gender_code': subject.performing_biologic_entity.administrative_gender_code.value,
            'death_indicator': subject.performing_biologic_entity.death_indicator,
            'birth_date': subject.performing_biologic_entity.birth_date,
            'assigned_study_site_protocol_version_relationship': str(subject.assigned_study_site_protocol_version_relationship[0])
        }
    assert src == res


def test_delete(app, server, page: Page):
    page.goto(current_url)
    page.locator("a").filter(has_text='Delete').click()
    page.wait_for_url('http://127.0.0.1:5000/space/1/subjects/')
    with app.app_context():
        subject = db.session.query(StudySubject).filter_by(id=current_id).all()
        assert not subject
