from datetime import datetime

from flask import Blueprint, url_for

from umdb import (
    Name,
    Person,
    Status,
    StudySiteProtocolVersionRelationship,
    StudySubject,
    StudySubjectProtocolVersionRelationship,
)
from web.db import db
from web.study.subject.form import StudySubjectForm
from web.views import CreateView, IndexDataTableView

from ...subject.lookup import lookup
from ...subject.schema import BiologicEntityList, StudySubjectList

blueprint = Blueprint("subject", __name__, url_prefix="/subjects")


class StudySubjectIndexView(IndexDataTableView):
    model = StudySubject
    schema = StudySubjectList
    template_name = "study/protocol/subject/index.html"

    def get_query(self, version_id, **kwargs):
        return (
            db.session.query(StudySubject)
            .join(StudySubject.assigned_study_subject_protocol_version_relationship)
            .join(
                StudySubjectProtocolVersionRelationship.assigning_study_site_protocol_version_relationship
            )
            .join(StudySiteProtocolVersionRelationship.executed_study_protocol_version)
            .filter(
                StudySiteProtocolVersionRelationship.executed_study_protocol_version_id
                == version_id
            )
        )


class StudySubjectCreateView(CreateView):
    db = db
    template_name = "study/subject/new.html"

    def get_object(self, **kwargs):
        name = Name()
        entity = Person(name=[name])
        subject = StudySubject(performing_biologic_entity=entity)
        subject.status = Status.candidate
        subject.status_date = datetime.now()
        return subject

    def get_form(self, object, study_id, **kwargs):
        return StudySubjectForm(obj=object, study_id=study_id)

    def url_for_redirect(self, version_id, **kwargs):
        return url_for(".index", version_id=version_id)


def lookup_view(study_id: int):
    form = StudySubjectForm(study_id=study_id)
    person_form = form.performing_biologic_entity.form
    person = Person(name=[Name()])
    person_form.populate_obj(obj=person)
    persons = lookup(db, person)
    return BiologicEntityList.model_validate(persons).model_dump()


blueprint.add_url_rule("/", view_func=StudySubjectIndexView.as_view("index"))
blueprint.add_url_rule("/new", view_func=StudySubjectCreateView.as_view("new"))
blueprint.add_url_rule("/lookup", view_func=lookup, endpoint="lookup")
