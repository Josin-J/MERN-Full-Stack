# Task Manager - Backend

REST API built with Node.js, Express, and MongoDB.

## Setup

```bash
npm install
```

Create `.env` file:
```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

## Run

```bash
npm run dev
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| PUT | /api/auth/update | Update username |

### Tasks (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/tasks | Create task |
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get single task |
| PUT | /api/tasks/:id | Update task |
| PATCH | /api/tasks/:id/toggle | Toggle status |
| DELETE | /api/tasks/:id | Delete task |

## Tech Stack
- Express 5
- Mongoose
- JWT + bcryptjs
- CORS
