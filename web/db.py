from flask_sqlalchemy import SQLAlchemy

from umdb.db import Base

db = SQLAlchemy(model_class=Base)
