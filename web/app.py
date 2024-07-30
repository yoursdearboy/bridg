from dotenv import load_dotenv
from flask import Flask
from flask_bootstrap import Bootstrap5

from .admin import admin
from .db import db

load_dotenv()

app = Flask(__name__)
app.config.from_prefixed_env(prefix="UMDB")

bootstrap = Bootstrap5()

db.init_app(app)
admin.init_app(app)

if __name__ == "__main__":
    app.run()
