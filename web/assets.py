from flask_assets import Bundle, Environment

assets = Environment()

css = Bundle(
    "../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css",
    output="styles.css",
)

js = Bundle(
    "../../node_modules/jquery/dist/jquery.min.js",
    "../../node_modules/luxon/build/global/luxon.min.js",
    "../../node_modules/datatables.net/js/dataTables.min.js",
    "../../node_modules/datatables.net-bs5/js/dataTables.bootstrap5.min.js",
    output="scripts.js",
)

assets.register("css", css)
assets.register("js", js)
