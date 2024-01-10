# BITS UNPLUGGED BACKEND

## Authentication

GET /auth/
POST /auth/login
POST /auth/signup

## topic

GET /topic/
POST /topic/
GET /topic/:topicId
PUT /topic/:topicId
DELETE /topic/:topicId

## series

## canvas

## problem

GET /problem/by_topic/:topicId
GET /problem/by_series/:seriesId

GET /problem/
POST /problem/
GET /problem/:problemId
PUT /problem/:problemId
DELETE /problem/:problemId

POST /problem/:problemId/rate
GET /problem/:problemId/rating
GET /problem/:problemId/avg_rating
POST /problem/:problemId/publish

## Submissions

GET /submissions
GET /submissions/:problemId
GET /submissions/my_stats/:problemId
GET /submissions/all_stats/:problemId
****
POST /submissions/submit/:problemId
POST /submissions/rate_me/:problemId
GET /submissions/unsolved

## Sequelize

### Initial Setup
Drop database: `npx sequelize db:drop`
Create database: `npx sequelize db:create`
Create schema: `npx sequelize db:migrate`
Populate tables: `npx sequelize db:seed:all`

### Changing schema
Creating a migration file: `npx sequelize migration:create --name alter-user-image`
Edit the file and migrate: `npx sequelize db:migrate --name *****-alter-user-image`

### Changing table data
Creating a migration file: `npx sequelize seed:generate --name add-problems`
Edit the file and seed: `npx sequelize db:seed --seed *****-add-problems`

### Updating remote
--- sensitive ---