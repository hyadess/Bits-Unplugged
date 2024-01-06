## Export

- pg_dump -d 'postgres://postgres.mnqhazjbbmyvpwbzjfoi:%23include%3CD1h%40n.h%3E@aws-0-us-east-1.pooler.supabase.com:6543/postgres' > <dump_file>


## Install Postgresql 15

- sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'

- wget -qO- https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo tee /etc/apt/trusted.gpg.d/pgdg.asc &>/dev/null

- sudo apt update

- sudo apt install postgresql postgresql-client -y

- sudo systemctl status postgresql

## Command Line

- sudo -u postgres psql

## Create Database

- CREATE DATABASE <database_name>;

- CREATE USER <username> WITH PASSWORD '<secret_pass>';

- GRANT ALL PRIVILEGES ON DATABASE <database_name> TO <user_name>;

## Import

- sudo -u postgres psql -d <database_name> -a -f <dump_file>

## Test

- sudo -u postgres psql <user_name> -d <database_name>

## Pg Admin 4 Setup

- host: localhost
- port: 5432
- database: <database_name>
- user: <user_name>
- password: <secret_pass>
