from flask import Blueprint

from . import subject

blueprint = Blueprint("study", __name__, url_prefix="/studies")

blueprint.register_blueprint(
    subject.blueprint, url_prefix=f"/<int:study_id>/{subject.blueprint.url_prefix}"
)
