# Setup and build the client

FROM node:20 as client

WORKDIR /app/frontend/
COPY frontend/package*.json .
RUN npm install --force --only=production
COPY frontend/ .
RUN npm run build

# Setup the server

FROM node:20

RUN apt-get update && apt-get install -y redis-server
WORKDIR /app/
COPY --from=client /app/frontend/build/ ./frontend/build/

WORKDIR /app/backend/
COPY backend/package*.json .
RUN npm install --only=production 
COPY backend/ .

EXPOSE $PORT 
CMD ["npm", "start"]