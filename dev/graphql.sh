#!/bin/sh

uv run uvicorn bridg.graphql.app:app --port 8001 --reload
