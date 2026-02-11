#!/bin/sh

uv run uvicorn bridg.graphql.app:app --reload
