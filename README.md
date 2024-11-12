# BRIDG

## Build

Bulding web assets.

```sh
flask --app web.app assets build
flask --app web.app assets-extra webfonts
```

Bulding localizations.

```sh
pybabel compile -d web/translations
```

## Development

Copy `.env.example` to `.env` and modify as needed.

Install Python and NPM dependencies.

```sh
poetry install
npm install
```

The rest commands are run in virtualenv.
Start shell using `poetry shell` or prefix commands with `poetry run`.

Reset database from scratch.

```sh
./dev/db-reset.sh
```

Run web app.

```sh
./dev/run.sh
```

You may want to build web assets, at least copy fonts, see [Build chapter](#build).
