import datetime
import re

from playwright.sync_api import Page, expect

from bridg import PerformedActivity, StudySubject
from web.db import db


def test_subject_index(app, server, page: Page):
    url = app.url_for("subject.index", space_id=1)
    request = page.request.get(url)
    expect(request).to_be_ok()


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


def test_edit_subject(app, server, page: Page):
    id = 1
    url = app.url_for("subject.activity.edit", id=id, subject_id=1, space_id=1)
    page.goto(url)
    src = {'containing_epoch': 1, 'context_for_study_site': 1,
           'status_code': 1, 'status_date': datetime.datetime(2024, 11, 6, 9, 0)}
    page.locator("id=containing_epoch").select_option(
        str(src['containing_epoch']))
    page.locator("id=context_for_study_site").select_option(
        str(src['context_for_study_site']))
    page.locator("id=status_code").select_option(str(src['status_code']))
    page.locator("id=status_date").fill(
        src['status_date'].strftime('%Y-%m-%d %H:%M:%S'))
    page.get_by_text("Save").click()
    with app.app_context():
        subject = db.session.query(PerformedActivity).filter_by(id=id).one()
        res = {'containing_epoch': subject.containing_epoch.id,
               'context_for_study_site': subject.context_for_study_site.id, 'status_code': subject.status_code.id, 'status_date': subject.status_date}
        print(res)
    assert src == res
