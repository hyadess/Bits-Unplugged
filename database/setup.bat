psql -U postgres -c "DROP DATABASE bitsunplugged;"
psql -U postgres -c "CREATE DATABASE bitsunplugged;"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE bitsunplugged TO postgres;"
psql -U postgres -d bitsunplugged -a -f dump.sql
