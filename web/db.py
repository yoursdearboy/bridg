from flask_sqlalchemy import SQLAlchemy

from bridg.db import Base

db = SQLAlchemy(model_class=Base)
