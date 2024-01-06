# Setup and build the client

FROM node:20 as client

WORKDIR /app/frontend/
COPY frontend/package*.json .
RUN npm install --force --only=production
COPY frontend/ .
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
EXPOSE $PORT 
CMD ["npm", "start"]