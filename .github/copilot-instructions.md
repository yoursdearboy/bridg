# Copilot agent onboarding instructions

Summary
- This repository implements the BRIDG data model in Python (SQLAlchemy). It's a small-to-medium monorepo using Python packages in `packages/` (alchemy, auth, common, graphql).
- Languages/runtimes: Python (requires >=3.14), SQLAlchemy, pytest, ruff, mkdocs. Postgres is used for CI and optional local DB (compose.yaml uses postgres:18).

Quick bootstrap (validated by reading project files)
- Use Python 3.14. Create and activate a venv matching that interpreter: `python3.14 -m venv .venv && . .venv/bin/activate`.
- Install the CLI used by CI (uv): `pip install uv` or `pipx install uv` if you prefer isolation. If that fails, install via your package manager as CI uses astral-sh/setup-uv.
- Install project dependencies the same way CI does: `uv sync --all-packages --all-extras --group test` (this installs all packages and test extras according to uv.lock/pyproject).
- System packages required on Linux (CI): `sudo apt install -y libjpeg-dev zlib1g-dev` — install equivalent libs on macOS (e.g., `brew install libjpeg zlib`) if tests or builds fail with image/ffi errors.

Commands (always run these in the activated venv unless otherwise noted)
- Lint: `uv run ruff check` (CI runs this; ruff settings are in pyproject.toml).
- Run unit tests (same scope as CI):
  - `uv run pytest packages/alchemy -s -vv`
  - `uv run pytest packages/graphql -s -vv`
- Database helper: `./dev/db-reset.sh` (resets Postgres if reachable; falls back to removing tmp/bridg.db). Use `docker compose -f compose.yaml up -d db` to start Postgres locally before running DB scripts.
- Run GraphQL server (development): `uv run uvicorn bridg.graphql.app:app --port 8001 --reload` (also provided by `dev/graphql.sh`).
- Generate docs: `mkdocs build` or `mkdocs serve` (mkdocs config at mkdocs.yml). Dev deps for docs are in pyproject dev group.

What CI does (so your PRs should replicate these checks locally)
- GitHub Actions job `BRIDG CI` (file: .github/workflows/test.yml):
  - Installs system libs (libjpeg-dev, zlib1g-dev).
  - Uses `astral-sh/setup-uv` action to make `uv` available.
  - Runs: `uv run ruff check` (lint) and `uv sync --all-packages --all-extras --group test` then `uv run pytest packages/alchemy` and `uv run pytest packages/graphql`.

Project layout & important files
- Root files: README.md, compose.yaml, mkdocs.yml, package.json, pyproject.toml, uv.lock, .github/
- Primary code packages: `packages/alchemy/`, `packages/auth/`, `packages/common/`, `packages/graphql/` (uv workspace members in pyproject).
- Dev helpers: `dev/` contains scripts and small CLI helpers (db-reset.sh, test.sh, graphql.sh, migrate.py, seed.py, model.py, versioning.py).
- Configuration:
  - pyproject.toml: project metadata, dev/test dependencies, ruff and pytest settings, and `tool.uv.workspace` members.
  - mkdocs.yml: documentation config.
  - compose.yaml: local Docker service for Postgres.
  - .github/workflows/test.yml: CI steps (lint, install system deps, uv sync, run pytest).

Environment and runtime notes (common pitfalls)
- Python version must be >=3.14. Use the same minor version locally to avoid typing/typing-stdlib related test failures.
- The repo uses `uv` to manage workspace dependencies. CI relies on `uv sync`. If `uv` is missing, emulate CI by installing the packages listed in each package's pyproject, but prefer installing `uv` to match CI precisely.
- On Linux CI the workflow installs system libs. Locally on macOS you will likely need Homebrew equivalents; on Windows use WSL for parity.
- DB: dev scripts attempt Postgres on localhost; if not present they fallback to SQLite at `tmp/bridg.db`. For full parity with CI, start Postgres via `docker compose -f compose.yaml up -d db` before running tests.
- Tests generate coverage reports (pytest addopts includes `--cov --cov-report html`) and write HTML cov into `htmlcov/`.

Where to make code changes (high-level guidance)
- Small feature or bugfixes that affect model/schema: update `packages/alchemy` (SQLAlchemy models) and then run `python -m dev.migrate` or `./dev/db-reset.sh` to update the DB schema for local testing.
- API or GraphQL changes: `packages/graphql` contains the GraphQL app. Use `dev/graphql.sh` to run it locally.
- Auth changes: `packages/auth` contains auth helpers (CLI accessible via `python -m bridg.auth` in scripts).

Checks a PR should satisfy before opening
- Branch builds locally: lint passes (`uv run ruff check`) and tests pass (`uv run pytest ...`).
- No runtime failures when running dev server: start DB (docker) and run `dev/graphql.sh` to smoke-test.
- Run `./dev/test.sh` at least once (this recreates DB for tests).

Trust and search policy for cloud agents
- Trust these instructions as authoritative for bootstrapping and validating changes. Only perform a repository-wide search when:
  - A command from these instructions fails locally (document the failure and retry with searches), or
  - The agent needs to locate a file not listed here (e.g., new packages or CI changes).

Helpful quick references (from this repo)
- Run full dependency sync: `uv sync --all-packages --all-extras --group test`
- Lint: `uv run ruff check` (ruff config in pyproject.toml; line-length=120)
- Tests (CI-equivalent): `uv run pytest packages/alchemy -s -vv` and `uv run pytest packages/graphql -s -vv`
- Dev helpers: `./dev/test.sh`, `./dev/db-reset.sh`, `./dev/graphql.sh`

If anything here appears out-of-date when you run it, run `git status` and search the repo for updated scripts or `.github/workflows` to mirror CI exactly. When in doubt, prefer reproducing the CI steps in `.github/workflows/test.yml`.

---
Agent signature: Copilot cloud agents should follow these instructions and report any deviation or failures back in the PR description with exact failing commands and logs.
