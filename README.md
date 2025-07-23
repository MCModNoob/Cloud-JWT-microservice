# JWT Auth Microservice

A Node.js microservice for user authentication using JWT, ready for AWS deployment.

## Features
- User registration & login
- JWT-based authentication
- MongoDB (Mongoose)
- Health check & protected route
- AWS Elastic Beanstalk ready

## Setup
1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your values
4. Start locally:
   ```bash
   npm start
   ```

## Environment Variables
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for signing JWTs
- `PORT`: Port to run the server (default: 3000)

## API Endpoints
- `POST /api/auth/register` — Register user `{ email, password }`
- `POST /api/auth/login` — Login, returns `{ token }`
- `GET /api/health/health` — Health check
- `GET /api/protected` — Protected route (requires `Authorization: Bearer <token>`)

## AWS Deployment (Elastic Beanstalk)
1. Commit all files, including `Procfile`
2. Set environment variables in AWS console
3. Deploy via AWS CLI or console

---
