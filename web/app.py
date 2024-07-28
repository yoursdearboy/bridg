from flask import Flask

from .admin import admin
from .db import db

app = Flask(__name__)
app.config.from_prefixed_env(prefix="UMDB")

db.init_app(app)
admin.init_app(app)
