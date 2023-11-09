docker-compose -f docker-compose.test.yml up -d postgres
cd backend
npm run test
cd ..
