from dotenv import load_dotenv
from flask import Flask
from flask_babel import Babel
from flask_bootstrap import Bootstrap5

from . import person, study, study_protocol_version
from .assets import assets
from .assets import cli as assets_cli
from .breadcrumbs import breadcrumbs
from .db import db
from .htmx import htmx
from .json import MyJSONProvider
from .templating import bool_filter, date_filter, datetime_filter

load_dotenv()

app = Flask(__name__)
app.config.from_prefixed_env(prefix="BRIDG")
app.json_provider_class = MyJSONProvider
app.json = MyJSONProvider(app)
app.cli.add_command(assets_cli)

babel = Babel()

bootstrap = Bootstrap5()

assets.init_app(app)
db.init_app(app)
babel.init_app(app)
bootstrap.init_app(app)
breadcrumbs.init_app(app)
htmx.init_app(app)

app.jinja_env.filters["date"] = date_filter
app.jinja_env.filters["datetime"] = datetime_filter
app.jinja_env.filters["bool"] = bool_filter

app.register_blueprint(person.blueprint)
app.register_blueprint(study.blueprint)
app.register_blueprint(study_protocol_version.blueprint)

if __name__ == "__main__":
    app.run()
