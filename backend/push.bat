psql -d 'postgres://postgres.mnqhazjbbmyvpwbzjfoi:%23include%3CD1h%40n.h%3E@aws-0-us-east-1.pooler.supabase.com:5432/postgres' -c "DROP DATABASE bitsunplugged;"
psql -d 'postgres://postgres.mnqhazjbbmyvpwbzjfoi:%23include%3CD1h%40n.h%3E@aws-0-us-east-1.pooler.supabase.com:5432/postgres' -c "CREATE DATABASE bitsunplugged;"
psql -d 'postgres://postgres.mnqhazjbbmyvpwbzjfoi:%23include%3CD1h%40n.h%3E@aws-0-us-east-1.pooler.supabase.com:5432/postgres' -c "GRANT ALL PRIVILEGES ON DATABASE bitsunplugged TO postgres;"
psql -d 'postgres://postgres.mnqhazjbbmyvpwbzjfoi:%23include%3CD1h%40n.h%3E@aws-0-us-east-1.pooler.supabase.com:5432/bitsunplugged' -a -f dump.sql
