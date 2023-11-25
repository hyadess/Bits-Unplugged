echo $1 | sudo -u postgres psql -c "DROP DATABASE bitsunplugged;"
echo $1 | sudo -u postgres psql -c "CREATE DATABASE bitsunplugged;"
echo $1 | sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE bitsunplugged TO postgres"
sudo -u postgres psql -d bitsunplugged -a -f $2
