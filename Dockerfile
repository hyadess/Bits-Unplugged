
# Setup and build the client

FROM node:20 as client


WORKDIR /app/frontend/
COPY frontend/package*.json .
RUN npm install --force --only=production
COPY frontend/ .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL $REACT_APP_API_BASE_URL

ARG VITE_APP_API_BASE_URL
ENV VITE_APP_API_BASE_URL $VITE_APP_API_BASE_URL

RUN npm run build   

# Setup the server

FROM node:20

RUN apt-get update
WORKDIR /app/
COPY --from=client /app/frontend/build/ ./frontend/build/

WORKDIR /app/backend/
COPY backend/package*.json .
RUN npm install
COPY backend/ .

ARG DB_USER
ENV DB_USER $DB_USER

ARG DB_HOST
ENV DB_HOST $DB_HOST

ARG DB_DB
ENV DB_DB $DB_DB

ARG DB_PASS
ENV DB_PASS $DB_PASS

ARG DB_PORT
ENV DB_PORT $DB_PORT

ARG PORT
ENV PORT $PORT
EXPOSE $PORT 

# Setup Database
RUN apt-get update && \
    apt-get install -y postgresql && \
    apt-get clean

COPY backend/dump.sql /docker-entrypoint-initdb.d/init.sql
COPY entrypoint.sh .

USER postgres
 
RUN /etc/init.d/postgresql start && psql -c "ALTER USER postgres WITH PASSWORD 'root';" && psql -c "CREATE DATABASE bitsunplugged;" && psql -c "GRANT ALL PRIVILEGES ON DATABASE bitsunplugged TO postgres;" && psql -d "postgres://postgres:root@localhost:5432/bitsunplugged" -a -f  /docker-entrypoint-initdb.d/init.sql && npx sequelize db:drop && npx sequelize db:create && npx sequelize db:migrate && npx sequelize db:seed:all


ENTRYPOINT ["./entrypoint.sh"]