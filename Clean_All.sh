#!/usr/bin/env bash

set -e

echo "---> 1. Stopping Docker"
docker compose down
clear

echo "---> 2. Deleting docker data"
docker system prune --all --volumes -f
clear

echo "---> 3. Deleting database"
sudo rm -rf backend/mysql/db/

echo "---> 4. Deleting node logs/node_modules"
sudo rm -rf backend/node/log/ backend/node/node_modules/

echo "---> 5. Deleting frontend node_modules"
sudo rm -rf frontend/node_modules/
