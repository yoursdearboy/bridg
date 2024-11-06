from flask import Blueprint

from . import subject

blueprint = Blueprint(
    "study_protocol_version", __name__, url_prefix="/study_protocol_version/"
)

blueprint.register_blueprint(
    subject.blueprint,
    url_prefix=f"/<int:study_protocol_version_id>/{subject.blueprint.url_prefix}",
)
