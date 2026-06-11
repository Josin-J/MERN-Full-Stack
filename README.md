# MERN Full Stack - Task Manager

A full stack task management application built with MongoDB, Express, React, and Node.js.

## Live Demo

- **Frontend:** https://to-do-list-rose-tau-41.vercel.app/
- **Backend:** https://mern-full-stack-uaht.onrender.com

## Features

### Backend
- User authentication (Register/Login) with JWT
- CRUD operations for tasks
- Task filtering by status and priority
- Input validation
- Centralized error handling
- CORS configuration

### Frontend
- Responsive design
- Protected routes
- Auth context (login, logout, isAuthenticated)
- Task search and filter tabs
- Loading spinners
- Toast notifications
- Add/Edit/Delete tasks
- Mark complete/pending toggle
- User profile with update

## Tech Stack

| Technology | Purpose |
|------------|---------|
| MongoDB | Database |
| Express | Backend framework |
| React | Frontend library |
| Node.js | Runtime |
| Vite | Build tool |
| JWT | Authentication |
| Axios | HTTP client |
| Mongoose | MongoDB ODM |
| bcryptjs | Password hashing |
| react-hot-toast | Notifications |

## Project Structure

```
MERN-Full-Stack/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── db.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── utils/
    │   └── App.jsx
    ├── .env
    └── package.json
```

## Setup

### Backend
```bash
cd backend
npm install
```

Create `.env`:
```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run:
```bash
npm run dev
```

### Frontend
```bash
cd frontend
npm install
```

Create `.env`:
```
VITE_API_URL=http://localhost:3000/api
```

Run:
```bash
npm run dev
```

## API Endpoints

### Auth
- POST `/api/auth/register` - Register
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get user
- PUT `/api/auth/update` - Update user

### Tasks (Protected)
- POST `/api/tasks` - Create
- GET `/api/tasks` - Get all
- GET `/api/tasks/:id` - Get one
- PUT `/api/tasks/:id` - Update
- PATCH `/api/tasks/:id/toggle` - Toggle status
- DELETE `/api/tasks/:id` - Delete

## Branches

| Branch | Description |
|--------|-------------|
| main | Production code |
| day1-3 | Backend setup + MongoDB |
| day4 | Auth system |
| day5 | Validation + error handler |
| day6-7 | Frontend + React Router |
| day8 | Dashboard + Tasks page |
| day9 | Add/Edit/Delete tasks |
| day10 | Toggle, search, filters |
| day11 | Profile page |
| day12 | Styling + cleanup |
