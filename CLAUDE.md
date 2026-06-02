# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Python implementation of the [BRIDG biomedical research data model](https://bridgmodel.nci.nih.gov). A uv workspace with four packages under `packages/`: `alchemy` (SQLAlchemy models), `auth` (Starlette auth), `common` (utilities), and `graphql` (Strawberry GraphQL API).

Requires Python ≥ 3.14.

## Commands

```sh
# Install everything
uv sync --all-packages --all-extras --group test

# Lint
uv run ruff check

# Run tests
uv run pytest packages/alchemy -s -vv
uv run pytest packages/graphql -s -vv
# don't run both packages simultaneously, versioning test will fail, run both using two command and & in shell

# Run a single test
uv run pytest packages/graphql/tests/study/test_performed_observation.py::test_performed_observation_create -s -vv

# Update snapshots
uv run pytest packages/alchemy -s -vv --snapshot-update
uv run pytest packages/graphql -s -vv --snapshot-update

# Start GraphQL server (dev)
./dev/graphql.sh                  # or: uv run uvicorn bridg.graphql.app:app --port 8001 --reload

# Reset dev database (Postgres + SQLite) and create demo user
./dev/db-reset.sh

# Run tests against a fresh test database (drops/recreates bridg-testing)
./dev/test.sh

# Start Postgres via Docker
docker compose -f compose.yaml up -d db
```

**Environment:** copy `.env.example` to `.env` and set `BRIDG_SQLALCHEMY_DATABASE_URI`. Tests default to SQLite (`BRIDG_ENV=test` loads `.env.test`).

**User management:**
```sh
python -m bridg.auth create demo -p pass
python -m bridg.auth auth demo --token token
```

## Architecture

### Package dependency graph

```
graphql → alchemy, auth, common
auth    → common
alchemy → (none in workspace)
common  → (none in workspace)
```

### `packages/alchemy` — the domain model

SQLAlchemy mapped classes that mirror BRIDG. All models extend `Base` (from `db.py`). Domain objects are organized into sub-packages matching BRIDG sections: `common/`, `protocol/`, `study/`, `biospecimen/`, `datatype/`.

Polymorphic inheritance is used heavily (e.g. `PerformedActivity` is the root; `PerformedObservation`, `PerformedEncounter`, etc. inherit from it). Polymorphic discriminator columns drive runtime dispatch in the converters.

`TerminologyService` manages `ConceptDescriptor` (coded values) with a session-scoped cache and get-or-create semantics.

`VersionedMixin` opts a model into `sqlalchemy-continuum` history tracking (optional dependency).

**Factory pattern:** `packages/alchemy/src/bridg/alchemy/factory/` contains `polyfactory`-based `SQLAlchemyFactory` subclasses for building test data. `BaseFactory.__session__` must be set before use (done automatically by the `session` pytest fixture).

### `packages/common` — converter infrastructure

`common/converter.py` implements a type-directed converter pipeline. Each converter function is decorated with `@configure` and matched by inspecting the input type and return type annotations. The `Converter.convert(value, target_type)` method walks the list until a match is found.

### `packages/graphql` — GraphQL API

Built with Strawberry + Starlette. Entry point: `app.py`.

**Schema layout** (`src/bridg/graphql/schema/`): mirrors the alchemy sub-packages. Each resource defines:
- A `@strawberry.type` (output)
- A `@strawberry.input` `*Input` type for mutations
- A `@strawberry.input` `*Filter` type for queries
- A `*Query` mixin class and a `*Mutation` mixin class

`Query` and `Mutation` in `schema/query.py` and `schema/mutation.py` compose all mixins via multiple inheritance.

**Naming conventions:** follow `Resource(id: ID)` / `ResourceList(filter: ResourceFilter)` for queries and `ResourceCreate` / `ResourceUpdate` / `ResourceDelete` for mutations (FHIR-style, not plural names).

**`Converter`** (`graphql/converter.py`): extends `common.Converter`. Handles `strawberry.Maybe` fields (skip if `None`), `strawberry.Private` fields (skip entirely), SQLAlchemy `Relationship`/`Composite`/`AssociationProxy` introspection, and polymorphic class selection.

**`SQLAlchemyExtension`**: Strawberry schema extension. Mutations run inside a `session.begin()` block and commit on success. Before each resolver call, flushes the session if dirty.

**`maybe.py`**: helpers for `strawberry.Maybe` — distinguishes "not provided" from `null`. Used extensively in `*Input` types so partial updates don't overwrite unset fields.

### Testing

Tests use `syrupy` JSON snapshots. The `session` fixture (in `alchemy/test/fixture.py`) wraps each test in a savepoint and rolls back on teardown — no migration needed between tests. Random seeds are fixed to 42 per test.

GraphQL tests call `schema.execute_sync(query, variables, context_value=context)` directly. Test input factories live in `packages/graphql/tests/factory/` (separate from the alchemy factories, building strawberry input dataclasses rather than SQLAlchemy models).

## Code conventions

- Always use `from __future__ import annotations` for postponed annotation evaluation; do not quote type annotations as strings.
- `__init__.py` files in `alchemy` and `graphql/schema` are auto-generated by `mkinit` (`poe mkinit`). Re-run after adding or removing public symbols.
- Line length: 120 (configured in `pyproject.toml`).
