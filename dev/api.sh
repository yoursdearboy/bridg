#!/bin/sh

ROOTPATH=$(pwd)

export PYTHONPATH=$ROOTPATH

fastapi dev $ROOTPATH/api/main.py
