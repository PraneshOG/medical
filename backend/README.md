
# MedLink Backend

This is a simple Node.js Express backend for the MedLink application.
It provides API endpoints for user registration and login using JWT authentication.

**Note:** User data is stored in-memory and will be lost when the server restarts. For a persistent solution, integrate a database.

## Prerequisites

- Node.js (v14 or newer recommended)
- npm (comes with Node.js)

## Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Running the Server

To start the server in development mode (with nodemon for automatic restarts on file changes):

```bash
npm run dev
```

To start the server in production mode:

```bash
npm start
```

The server will run on `http://localhost:3001` by default.

## API Endpoints

-   **POST `/api/auth/register`**
    -   Registers a new user.
    -   **Request Body:** `{ "email": "user@example.com", "password": "yourpassword" }`
    -   **Success Response (201):** `{ "token": "jwt_token_here", "user": { "email": "user@example.com" } }`
    -   **Error Responses:** 400 (Bad Request), 500 (Server Error)

-   **POST `/api/auth/login`**
    -   Logs in an existing user.
    -   **Request Body:** `{ "email": "user@example.com", "password": "yourpassword" }`
    -   **Success Response (200):** `{ "token": "jwt_token_here", "user": { "email": "user@example.com" } }`
    -   **Error Responses:** 400 (Bad Request), 401 (Unauthorized), 500 (Server Error)

## Important Security Note

The `JWT_SECRET` in `server.js` is hardcoded. In a production environment, **NEVER** hardcode secrets. Use environment variables instead. For example:

```javascript
// In server.js
// const JWT_SECRET = process.env.JWT_SECRET; 
```
And set the `JWT_SECRET` environment variable when running your application.
