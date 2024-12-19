import datetime
import re

from playwright.sync_api import Page, expect
from toolz import dissoc

from bridg import (
    AdministrativeGender,
    BiologicEntity,
    EntityName,
    PerformedActivity,
    PerformedObservation,
    PerformedSubstanceAdministration,
    Status,
    StudySiteProtocolVersionRelationship,
    StudySubject,
)
from web.db import db


def test_subject_index(app, server, page: Page):
    url = app.url_for("subject.index", space_id=1)
    request = page.request.get(url)
    expect(request).to_be_ok()


def test_new_subject(app, server, page: Page):
    # {'id': 4,
    #  'performing_biologic_entity_id': 9,
    #  'status': <Status.candidate: 'candidate'>,
    #  'status_date': datetime.datetime(2024, 12, 19, 9, 40, 51),
    #  'performing_organization_id': None,
    #  'performing_biologic_entity': <bridg.common.person.Person object at 0x7f77c3e7b290>,
    #  'assigned_study_subject_protocol_version_relationship': [<bridg.study.study_subject_protocol_version_relationship.StudySubjectProtocolVersionRelationship object at 0x7f77c32c8e10>],
    #  '_AssociationProxy_assigned_study_subject_protocol_version_relationship_140152649145232': (140152352317136, 140152600621392, [<bridg.study.study_site_protocol_version_relationship.StudySiteProtocolVersionRelationship object at 0x7f77c3f87990>])}
    src = {'family': 'Test',
           'given': 'Test',
           'administrative_gender_code': "M",
           'death_indicator': False,
           'birth_date': datetime.date(2000, 1, 1),
           'assigned_study_site_protocol_version_relationship': 'DGOI in AML-MRD-2018'}
    url = app.url_for("subject.new", space_id=1)
    page.goto(url)
    page.locator(
        "#performing_biologic_entity-name-0-family").fill(src['family'])
    page.locator(
        "#performing_biologic_entity-name-0-given").fill(src['given'])
    page.locator(
        "#performing_biologic_entity-administrative_gender_code").select_option(src['administrative_gender_code'])
    page.locator(
        "#performing_biologic_entity-death_indicator").select_option(str(src['death_indicator']).lower())
    page.locator(
        "#performing_biologic_entity-birth_date").fill(src['birth_date'].strftime('%Y-%m-%d'))
    page.locator('span').all()[1].click()
    page.wait_for_load_state()
    page.locator("li").filter(
        has_text=src['assigned_study_site_protocol_version_relationship']).click()
    form = page.locator('#study-subject-form')
    submit = form.locator('[type ="submit"]')
    submit.click()
    current_id = re.search(r'/subjects/(\d+)$', page.url)[1]
    with app.app_context():
        subject = db.session.query(StudySubject).filter_by(id=current_id).one()
        print(subject.__dict__)
        res = {
            'family': subject.performing_biologic_entity.name[0].family,
            'given': subject.performing_biologic_entity.name[0].given,
            'administrative_gender_code': subject.performing_biologic_entity.administrative_gender_code.value,
            'death_indicator': subject.performing_biologic_entity.death_indicator,
            'birth_date': subject.performing_biologic_entity.birth_date,
            'assigned_study_site_protocol_version_relationship': str(subject.assigned_study_site_protocol_version_relationship[0])
        }
        assert src == res
        ss = db.session.query(StudySubject).filter_by(id=current_id).one()
        db.session.delete(ss)
        db.session.commit()


def test_edit_subject(app, server, page: Page):
    id = 1
    url = app.url_for("subject.edit", id=id, space_id=1)
    page.goto(url)
    # src = {'id': 1,
    #        'performing_biologic_entity_id': 7,
    #        'status': Status.eligible ,
    #        'status_date': datetime.datetime(2024, 11, 6, 12, 0),
    #        'performing_organization_id': None}
    src = {'assigned_study_site_protocol_version_relationship': 'DGOI in AML-MRD-2018',
           'status': Status.eligible, 'status_date': datetime.datetime(2024, 11, 6, 12, 0)}
    page.locator(
        "#select2-assigned_study_site_protocol_version_relationship-container").click()
    page.locator('span').all()[1].click()
    page.wait_for_load_state()
    page.locator("li").filter(
        has_text=src['assigned_study_site_protocol_version_relationship']).click()
    page.get_by_text("Extra").click()
    page.locator("#status").select_option(src['status'].value)
    page.locator("#status_date").fill(
        src['status_date'].strftime('%Y-%m-%d %H:%M:%S'))
    form = page.locator('#study-subject-form')
    submit = form.locator('[type ="submit"]')
    submit.click()
    with app.app_context():
        subject = db.session.query(StudySubject).filter_by(id=id).one()
        res = {'assigned_study_site_protocol_version_relationship': str(subject.assigned_study_site_protocol_version_relationship[0]),
               'status': subject.status, 'status_date': subject.status_date}
        assert src == res


def test_edit_subject_activity(app, server, page: Page):
    id = 2
    url = app.url_for("subject.activity.edit", id=id, subject_id=1, space_id=1)
    page.goto(url)
    src = {'repetition_number': None,
           'instantiated_defined_activity_id': 1,
           'name_code_modified_text': None,
           'reason_code_id': None,
           'negation_indicator': None,
           'status_date': datetime.datetime(2024, 11, 6, 9, 0),
           'status_code_id': 1,
           'comment': '',
           'id': 2,
           'containing_epoch_id': 1,
           'executing_study_protocol_version_id': 1,
           'type': 'observation',
           'using_project_id': None,
           'context_for_study_site_id': 1,
           'involved_subject_id': 1}
    page.locator("#containing_epoch").select_option(
        str(src['containing_epoch_id']))
    page.locator("#context_for_study_site").select_option(
        str(src['context_for_study_site_id']))
    page.locator("#status_code").select_option(str(src['status_code_id']))
    page.locator("#status_date").fill(
        src['status_date'].strftime('%Y-%m-%d %H:%M:%S'))
    submit = page.locator('[type ="submit"]')
    submit.click()
    with app.app_context():
        subject = db.session.query(PerformedActivity).filter_by(id=id).one()
        res = dissoc(subject.__dict__, '_sa_instance_state')
    assert src == res


def test_create_subject_item(app, server, page: Page):
    url = app.url_for("subject.show", id=2, space_id=1)
    page.goto(url)
    page.locator('button').filter(has_text='New').click()
    page.locator('a').filter(has_text='Laboratory').click()
    page.locator('a').filter(has_text='Immunophenotyping').click()
    page.wait_for_url(
        'http://127.0.0.1:5000/space/1/subjects/2/new?defined_activity_id=2')
    src = {'repetition_number': None, 'instantiated_defined_activity_id': 2, 'name_code_modified_text': None, 'reason_code_id': None, 'negation_indicator': None, 'status_date': datetime.datetime(
        2024, 11, 6, 9, 0), 'status_code_id': 1, 'comment': '', 'id': 4, 'containing_epoch_id': 1, 'executing_study_protocol_version_id': 1, 'type': 'observation', 'using_project_id': 1, 'context_for_study_site_id': 1, 'involved_subject_id': 2}
    page.locator("#containing_epoch").select_option(
        str(src['containing_epoch_id']))
    page.locator("#context_for_study_site").select_option(
        str(src['context_for_study_site_id']))
    page.locator("#status_code").select_option(str(src['status_code_id']))
    page.locator("#status_date").fill(
        src['status_date'].strftime('%Y-%m-%d %H:%M:%S'))
    submit = page.locator('[type ="submit"]')
    submit.click()
    with app.app_context():
        subject = db.session.query(PerformedActivity).filter_by(
            involved_subject_id=2).one()
        res = dissoc(subject.__dict__, '_sa_instance_state')
        assert src == res
        ss = db.session.query(PerformedActivity).filter_by(
            involved_subject_id=2).one()
        db.session.delete(ss)
        db.session.commit()


def test_delete_subject(app, server, page: Page):
    with app.app_context():
        sspvr = db.session.query(
            StudySiteProtocolVersionRelationship).first()
        subject = StudySubject(performing_biologic_entity=BiologicEntity(
            name=[EntityName(family='Test', given='Test')],
            administrative_gender_code=AdministrativeGender.male,
            death_indicator=False,
            birth_date=datetime.date(1991, 1, 1)),
            assigned_study_site_protocol_version_relationship=[sspvr])
        db.session.add(subject)
        db.session.commit()
        url = app.url_for("subject.show", id=subject.id, space_id=1)
        page.goto(url)
        page.get_by_text("Delete").click()
        page.wait_for_url('http://127.0.0.1:5000/space/1/subjects/')
        subject = db.session.query(
            StudySiteProtocolVersionRelationship).filter_by(id=subject.id).all()
        assert not subject


def test_delete_subject_item(app, server, page: Page):
    with app.app_context():
        activity = PerformedSubstanceAdministration(
            context_for_study_site_id=1,
            containing_epoch_id=2,
            executing_study_protocol_version_id=1,
            instantiated_defined_activity_id=4,
            involved_subject_id=1
        )
        db.session.add(activity)
        db.session.commit()
        id = activity.id
        url = app.url_for("subject.activity.edit", id=id,
                          subject_id=1, space_id=1)
        page.goto(url)
        page.get_by_text("Actions").click()
        page.get_by_text("Delete").click()
        page.wait_for_timeout(2)
        subject = db.session.query(PerformedActivity).filter_by(id=id).all()
        assert not subject
