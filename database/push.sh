DB='postgres://postgres:%23include%3CD1h%40n.h%3E@db.iprmlpqzxsyxpfjmrakl.supabase.co:5432/postgres'
sudo psql -d $DB -c "DROP DATABASE bitsunplugged;"
sudo psql -d $DB -c "CREATE DATABASE bitsunplugged;"
sudo psql -d $DB -c "GRANT ALL PRIVILEGES ON DATABASE bitsunplugged TO postgres;"
sudo psql -d 'postgres://postgres:%23include%3CD1h%40n.h%3E@db.iprmlpqzxsyxpfjmrakl.supabase.co:5432/bitsunplugged' -a -f dump.sql