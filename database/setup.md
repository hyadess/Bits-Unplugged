## Install Dependencies
> sudo apt install docker-compose
## Create Containers
> docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
## Copy DB Dump to Container
> docker cp /path/to/db_dump bitsunplugged-database:/home/dump.sql
## Execute DB Container
> docker exec -it bitsunplugged-database bash
## Start PSQL
> psql -U postgres
## Create Database
> CREATE DATABASE bitsunplugged;
> CREATE USER dihan WITH PASSWORD 'root';
> GRANT ALL PRIVILEGES ON DATABASE bitsunplugged TO dihan;
> \q
## Import
> psql -U postgres -d bitsunplugged -a -f /home/dump.sql
> exit

