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

## Windows + Linux

`git config --global core.eol lf`
`git config --global core.autocrlf false`

## Push to Github

`./dump.sh` <!-- If there are changes to database schema -->
`git add dump.sql`
`git commit -m "All changes"`
`git checkout dev`
`git pull origin dev`
`git checkout <your_branch>`
`git merge dev`
`git push origin dev`

## Packages

Time picker: https://time.openstatus.dev/
