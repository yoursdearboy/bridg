from flask_assets import Bundle, Environment
from webassets.filter import register_filter

from .typescript import TypeScript

assets = Environment()

css = Bundle(
    "../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css",
    "../../node_modules/bootstrap/dist/css/bootstrap.min.css",
    "../../node_modules/select2/dist/css/select2.min.css",
    Bundle("../assets/styles.scss", filters="libsass"),
    output="styles.css",
)

js = Bundle(
    "../../node_modules/bootstrap/dist/js/bootstrap.min.js",
    "../../node_modules/jquery/dist/jquery.min.js",
    "../../node_modules/luxon/build/global/luxon.min.js",
    "../../node_modules/datatables.net/js/dataTables.min.js",
    "../../node_modules/datatables.net-bs5/js/dataTables.bootstrap5.min.js",
    "../../node_modules/select2/dist/js/select2.min.js",
    "../../node_modules/alpinejs/dist/cdn.js",
    "../../node_modules/htmx.org/dist/htmx.min.js",
    "../assets/alpine.js",
    "../assets/select2.js",
    output="scripts.js",
)

assets.register("css", css)
assets.register("js", js)

register_filter(TypeScript)
