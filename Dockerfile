# Setup and build the client

FROM node:20 as client

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

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

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

ARG PORT
EXPOSE $PORT 
CMD ["npm", "start"]