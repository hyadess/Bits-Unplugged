DB='postgres://postgres.iprmlpqzxsyxpfjmrakl:%23include%3CD1h%40n.h%3E@aws-0-ap-south-1.pooler.supabase.com:5432/postgres'
sudo psql -d $DB -c "DROP DATABASE bitsunplugged;"
sudo psql -d $DB -c "CREATE DATABASE bitsunplugged;"
sudo psql -d $DB -c "GRANT ALL PRIVILEGES ON DATABASE bitsunplugged TO postgres;"
sudo psql -d 'postgres://postgres.iprmlpqzxsyxpfjmrakl:%23include%3CD1h%40n.h%3E@aws-0-ap-south-1.pooler.supabase.com:5432/bitsunplugged' -a -f dump.sql