#!/usr/bin/env bash

set -e

echo "---> Setting up correct permissions..."
sudo chmod +x Run_PharmTech.sh
cd backend/node/execution-tools
sudo chmod +x wait-for-it.sh
sudo chmod +x wait-until.sh
cd ../../../
echo "---> Permissions have been set"

echo "---> Installing packages for backend & frontend"
cd backend/node && yarn
cd ../../frontend && yarn
echo "---> Packages Installed."

echo "---> Building docker-compose images..."
cd ..
docker compose build
echo "-------> Done! To deploy project, run $ ./Run_PharmTech.sh"
