# The Biomedical Research Integrated Domain Group (BRIDG) Model [^1]

Implemented in Python with support for persistence using SQLAlchemy.
Also a web interface for electronic data capture (EDC).

## OpenAPI

Schemas of models in the `api/models` have same names as the models.
The rest of schemas are named the way Pydantic will do it.

---

Below is the old README:

## Configuration and Profiles

The web app has notion of profiles.
The profile can be set using `BRIDG_ENV` environment variable,
which is `development` by default.

Depending on the profile the app loads environment variables from `.env` file and profile specific `.env.xxx` file.
Though the profile specific file doesn't override variables set in `.env` file.
This is done for compatibility with `flask` cli command.

By default the repository contains `.env.development` and `.env.testing` files for corresponding profiles.
And the file for the production profile `.env.production` is added to `.gitignore`, so it won't be present in repository ever, because it may contain secrets.

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

[^1]: [BRIDG: An international standard for biomedical research concepts designed to support computable semantic interoperability](https://bridgmodel.nci.nih.gov)
