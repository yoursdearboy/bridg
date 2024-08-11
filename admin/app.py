from dotenv import load_dotenv
from flask import Flask
from flask_admin import Admin
from flask_babel import Babel
from flask_sqlalchemy import SQLAlchemy

from umdb import Base

from .common import (
    HealthcareFacilityView,
    HealthcareProviderGroupView,
    HealthcareProviderView,
    OrganizationView,
    PersonView,
    StudySubjectview,
)
from .protocol import StudyProtocolView
from .study import StudySiteView, StudyView

load_dotenv()

app = Flask(__name__)
app.config.from_prefixed_env(prefix="UMDB")

babel = Babel(app)
db = SQLAlchemy(app, model_class=Base)
admin = Admin(app, name="umdb", template_mode="bootstrap3")

admin.add_view(PersonView(PersonView.model, db.session, category="Common"))
admin.add_view(
    OrganizationView(
        OrganizationView.model,
        db.session,
        endpoint="organization",
        category="Common",
    )
)
admin.add_view(
    HealthcareFacilityView(
        HealthcareFacilityView.model,
        db.session,
        name="Healthcare facility",
        endpoint="healthcare_facility",
        category="Common",
    )
)
admin.add_view(
    HealthcareProviderView(
        HealthcareProviderView.model,
        db.session,
        name="Healthcare provider",
        endpoint="healthcare_provider",
        category="Common",
    )
)
admin.add_view(
    HealthcareProviderGroupView(
        HealthcareProviderGroupView.model,
        db.session,
        name="Healthcare provider group",
        endpoint="healthcare_provider_group",
        category="Common",
    )
)
admin.add_view(
    StudySubjectview(
        StudySubjectview.model, db.session, name="Subject", category="Common"
    )
)

admin.add_view(
    StudyProtocolView(
        StudyProtocolView.model, db.session, name="Protocol", category="Protocol"
    )
)

admin.add_view(StudyView(StudyView.model, db.session, name="Study", category="Study"))
admin.add_view(
    StudySiteView(StudySiteView.model, db.session, name="Site", category="Study")
)

if __name__ == "__main__":
    app.run()
