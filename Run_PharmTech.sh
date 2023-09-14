#!/usr/bin/env bash
sudo tee /etc/sudoers.d/$USER <<END
END

set -e

docker compose down -v
docker compose up -d

source backend/node/.env

echo "Loading PharmTech db..."
./backend/node/execution-tools/wait-until.sh "docker compose exec -T -e MYSQL_PWD=${MYSQL_PASS} ${MYSQL_HOST} mysql -u ${MYSQL_USER} -D ${MYSQL_DB} -e 'select 1'" > /dev/null 2>&1
echo "Successfully loaded in pharmtech db"

echo "Restarting Database & API containers"
docker restart pharmtech-backend-db-1
docker restart pharmtech-backend-api-1
docker compose up
