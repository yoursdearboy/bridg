#!/bin/sh

cd /usr/src/app

. .venv/bin/activate

python -m dev.migrate
uvicorn bridg.graphql.app:app --host 0.0.0.0 --port 8001
