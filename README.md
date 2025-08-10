# Competency Assessment Platform - Backend

#### This is the server-side application for the Competency Assessment Platform. It handles user authentication, question management, and the core assessment logic.

### Live link: https://competency-assessment-backend.vercel.app

## Features

- Secure Authentication: User registration and login functionality using JSON Web Tokens (JWT) for secure access.
- Role-Based Access Control: Differentiated access permissions for 'admin' and 'student' roles.
- Question Management: Admins can create, read, update, and delete assessment questions
- Multi-Step Assessment Logic: Dynamically fetches questions based on the user's current assessment step (A1/A2, B1/B2, C1/C2).
- Automatic Scoring: Automatically calculates the user's score upon submission and updates their certification level and progress.
- Error Handling: Implemented a global error handler for consistent and predictable error responses.

## Technology Stack

- Runtime: Node.js
- Framework: Express.js
- Language: TypeScript
- Database: MongoDB with Mongoose
- Authentication: JSON Web Token (JWT), bcrypt
- Deployment: Vercel

## Setup and Installation (Local)

To run this project locally, follow these steps:

Clone the repository:

`git clone [yours backend repository link]`

`cd competency-assessment-backend`

Install dependencies:
`npm install`

Create a .env file:
Create a .env file in the root directory and add the following environment variables. Replace the values with your own.
`PORT=5000`
`DATABASE_URL=your_mongodb_connection_string`
`BCRYPT_SALT_ROUNDS=12`
`JWT_ACCESS_SECRET=your_super_secret_for_access_token`
`JWT_REFRESH_SECRET=your_super_secret_for_refresh_token`
`JWT_ACCESS_EXPIRES_IN=1d`
`JWT_REFRESH_EXPIRES_IN=365d`

Run the development server:
`npm run dev`

The server will start on http://localhost:5000.

## API Endpoints

A few of the main API endpoints include:

- `POST /api/v1/users/register` - Register a new user.

- `POST /api/v1/auth/login` - Login a user and get JWT tokens.

- `GET /api/v1/users/me` - Get the logged-in user's profile (Protected).

- `POST /api/v1/questions/create-question` - Create a new question (Admin only).

- `POST /api/v1/assessments/start` - Start a new assessment step (Student only).

- `POST /api/v1/assessments/submit/:assessmentId` - Submit answers for an assessment (Student only).
