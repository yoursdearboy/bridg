import os
import shutil

from flask import current_app
from flask.cli import AppGroup, with_appcontext
from flask_assets import Bundle, Environment

assets = Environment()

css = Bundle(
    "../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css",
    "../../node_modules/datatables.net-rowgroup-bs5/css/rowGroup.bootstrap5.min.css",
    "../../node_modules/bootstrap/dist/css/bootstrap.min.css",
    "../../node_modules/select2/dist/css/select2.min.css",
    Bundle(
        "../assets/fontawesome.scss",
        "../assets/styles.scss",
        "../assets/utilities.scss",
        filters="libsass",
    ),
    output="styles.css",
)

webfonts = Bundle(
    "../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.ttf",
    "../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff2",
    "../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.ttf",
    "../../node_modules/@fortawesome/fontawesome-free/webfonts/fa-solid-900.woff2",
    output="webfonts",
)

js = Bundle(
    "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
    "../../node_modules/jquery/dist/jquery.min.js",
    "../../node_modules/luxon/build/global/luxon.min.js",
    "../../node_modules/datatables.net/js/dataTables.min.js",
    "../../node_modules/datatables.net-bs5/js/dataTables.bootstrap5.min.js",
    "../../node_modules/datatables.net-rowgroup/js/dataTables.rowGroup.min.js",
    "../../node_modules/datatables.net-rowgroup-bs5/js/rowGroup.bootstrap5.min.js",
    "../../node_modules/select2/dist/js/select2.min.js",
    "../../node_modules/alpinejs/dist/cdn.js",
    "../../node_modules/@alpinejs/persist/dist/cdn.js",
    "../../node_modules/htmx.org/dist/htmx.min.js",
    "../assets/alpine.js",
    "../assets/select2.js",
    "../assets/search.js",
    "../assets/theme.js",
    output="scripts.js",
)

assets.register("css", css)
assets.register("js", js)
# webassets doesn't work with binary files,
# so we don't register the bundle,
# but use it as container for command `copy_webfonts`
# assets.register("webfonts", webfonts)

# FIXME: extend `assets` group
# It isn't possible because Flask finds the Flask-Assets script and passes control there,
# so we don't even have the ability to extend it.
cli = AppGroup("assets-extra", short_help="Extra web assets commands.")


@cli.command("webfonts")
@with_appcontext
def copy_webfonts():
    if not current_app.static_folder:
        raise RuntimeError("The app has no static folder")
    for content in webfonts.contents:
        static = current_app.static_folder
        output = webfonts.output
        filename = os.path.basename(content)
        in_path = os.path.join(static, content)
        out_dir = os.path.join(static, output)
        out_path = os.path.join(out_dir, filename)
        os.makedirs(out_dir, exist_ok=True)
        shutil.copyfile(in_path, out_path)
