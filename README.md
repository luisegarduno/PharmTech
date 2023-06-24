# PharmTech

[comment]: <> (@todo Finish README.md)
[comment]: <> (@body Complete the 'About', 'Prerequisites', 'Deployment', & 'Additional Config' sections)

## Table of Contents
- [About](#about)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - Deploy [via local network](#option-1-deploying-local-database--api-to-docker-containers-local) or [w/ AWS Tools](#option-2-deploying-rds-cloud-database--api-to-docker-containers-ec2-linux-instance)
- [Additional configuration](#additional-configuration)

## About
What is PharmTech?
- PharmTech is a  full-stack pharmaceutical web application that allows pharmacists, doctors, and drug manufactures to update inventory, send patient prescriptions, request inventory and more!

## Prerequisites
- `Docker` v19.03.13 or higher
- `Docker-compose` v1.27.4 or higher 
- `Node.js` v16.15.1 or higher
- `npm` v6.14.9 or higher
- `yarn` v1.22.5 or higher

## Installation

#### Option 0: For a quick-start - Deploying local database + _API_ to docker containers (<ins>_local_<ins>)
1. Build docker image: `$ ./First_Run.sh`
2. Start docker container `$ ./Start_PharmTech`

#### Option 1: Deploying local database + _API_ to docker containers (<ins>_local_<ins>)
1. Deploy Frontend & Backend (Using Docker) ➡ `$ docker compose up`
- or Backend ONLY ➡ `$ cd PharmTech/backend; yarn run dev`
- or Frontend ONLY ➡ `$ cd PharmTech/frontend; yarn start`

#### Option 2: Deploying <ins>`RDS cloud database`<ins> + _API_ to docker containers (<ins>_`EC2 Linux Instance`_<ins>)
1. AWS Management Console
2. Create _RDS MySQL Database_
3. Create _EC2 Linux Instance_
4. Install the following within _EC2 Linux Instance_:
  - `Node.js` + `npm` + `yarn`
  - <a href="https://gist.github.com/npearce/6f3c7826c7499587f00957fee62f8ee9" target="_top"><b>`Docker + Docker-Compose`</b></a>
  - clone project repository
6. Within the `PharmTech/backend` folder, create `.env` file & enter cloud database credentials :

> MYSQL_DB=<br>
  MYSQL_PORT=<br>
  MYSQL_CLOUD_USER=<br>
  MYSQL_CLOUD_PASS=<br>
  MYSQL_CLOUD_HOST=

7. Deploy Frontend & Backend (Using Docker) ➡ `$ docker compose up`
- or Backend ONLY ➡ `$ cd PharmTech/backend; yarn run dev`
- or Frontend ONLY ➡ `$ cd PharmTech/frontend; yarn start`

## Additional configuration
