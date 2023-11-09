# BITS UNPLUGGED BACKEND

## Authentication

GET /auth/
POST /auth/login
POST /auth/signup

## topic

GET /topic/
POST /topic/
GET /topic/:topic_id
PUT /topic/:topic_id
DELETE /topic/:topic_id

## algorithm

## canvas

## problem

GET /problem/by_topic/:topic_id
GET /problem/by_algo/:algo_id

GET /problem/
POST /problem/
GET /problem/:problem_id
PUT /problem/:problem_id
DELETE /problem/:problem_id

POST /problem/:problem_id/rate
GET /problem/:problem_id/rating
GET /problem/:problem_id/avg_rating
POST /problem/:problem_id/publish

## Submissions

GET /submissions
GET /submissions/:problem_id
GET /submissions/my_stats/:problem_id
GET /submissions/all_stats/:problem_id

POST /submissions/submit/:problem_id
POST /submissions/rate_me/:problem_id
GET /submissions/unsolved
