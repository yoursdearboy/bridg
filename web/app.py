from dotenv import load_dotenv
from flask import Flask
from flask_bootstrap import Bootstrap5

from . import study
from .admin import admin
from .assets import assets
from .db import db
from .json import MyJSONProvider

load_dotenv()

app = Flask(__name__)
app.config.from_prefixed_env(prefix="UMDB")
app.json_provider_class = MyJSONProvider
app.json = MyJSONProvider(app)

bootstrap = Bootstrap5()

db.init_app(app)
admin.init_app(app)
assets.init_app(app)
bootstrap.init_app(app)

app.register_blueprint(study.blueprint)

if __name__ == "__main__":
    app.run()
