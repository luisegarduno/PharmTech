#!/usr/bin/env bash

set -e

cd backend/node && yarn
cd ../../frontend && yarn

cd ..
docker-compose build