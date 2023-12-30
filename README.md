## Docker Setup
`Development: docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d`
`Production: docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d`

## Local Setup:
- `Install PostgreSQL 15`
- `Setup Deatabase`
  - `Execute database/setup.bat (Windows)`
  - `Execute database/setup.sh (Linux)`
- `cd backend && npm i && npm run dev`
- `cd frontend && npm i --force && npm run start`