FROM python:3.14 AS builder

ENV UV_NO_DEV=1
ENV UV_PYTHON_DOWNLOADS=0

COPY --from=ghcr.io/astral-sh/uv:0.8.22 /uv /uvx /bin/

WORKDIR /usr/src/app

RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    --mount=type=bind,source=packages/alchemy/pyproject.toml,target=packages/alchemy/pyproject.toml \
    --mount=type=bind,source=packages/auth/pyproject.toml,target=packages/auth/pyproject.toml \
    --mount=type=bind,source=packages/common/pyproject.toml,target=packages/common/pyproject.toml \
    --mount=type=bind,source=packages/graphql/pyproject.toml,target=packages/graphql/pyproject.toml \
    uv sync --frozen --no-install-workspace

COPY . /usr/src/app/

RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --all-packages --all-extras

FROM python:3.14

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app/

EXPOSE 8001

CMD ["/usr/src/app/docker.sh"]
