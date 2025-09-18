# Decluttr Backend

This is the backend for **Decluttr**, a gamified cleaning app that motivates users to complete tasks, earn rewards, and unlock achievements.

The backend is built with **Node.js, Express, and MongoDB** to handle authentication, user stats, tasks, achievements, and more.

## Tech Stack

- **Node.js** – Runtime environment
- **Express** – Web framework
- **MongoDB** – Database
- **Mongoose** – ODM for MongoDB
- **JWT** – Authentication & security

## Getting Started

Follow these steps to run the backend locally:

### 1. Clone the repository

git clone https://github.com/your-username/decluttr-backend.git
cd decluttr-backend

### 2. Install dependencies

npm install

### 3. Configure environment variables

Create a .env file in the project root with:

MONGO_URI=(your-mongodb-connection-string)
PORT=3002
JWT_SECRET=(your-secret-key)

### 4. Run the server

npm run seed
npm run dev

## API Overview

The backend exposes RESTful API endpoints including:

### Authentication

POST /register = Register a new user

POST /login → Login and receive a JWT

### Tasks

GET /tasks = Fetch all tasks

### Achievements

GET /achievements = Fetch all achievements

POST /user-achievements/increment/:achievementId = Increment progress

### User Stats

PATCH /users/stats = Update XP, level, streak, gems

### Testing

You can test API endpoints using:

Postman

Your connected frontend

## Future Improvements

- Add admin routes for managing tasks & achievements
