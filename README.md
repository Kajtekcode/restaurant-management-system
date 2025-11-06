# 🍽️ Restaurant Management System

A full-stack web application built with **React**, **Node.js (Express)**, and **PostgreSQL (via Prisma ORM)**.  
Developed as part of my portfolio to demonstrate modern software development and database integration skills.

### 🌟 Current Progress
✅ Project structure (frontend + backend + Docker + Prisma)  
✅ Authentication system with JWT + bcryptjs  
✅ Menu management CRUD  
✅ Reservations CRUD  
⬜ Dashboard analytics  

### 🧰 Tech Stack
**Frontend:** React (Vite) + TypeScript + TailwindCSS  
**Backend:** Node.js + Express + TypeScript  
**Database:** PostgreSQL + Prisma ORM  
**Auth:** JWT tokens + HttpOnly cookies  
**DevOps:** Docker Compose, ESLint, Prettier

---

🧑‍🍳 Built by [Kajetan Kwiatkowski](https://github.com/Kajtekcode) – aspiring Bitcoin-focused software developer.



A full-stack web application for managing restaurant operations, including menu management, reservations, and daily reports.

## Stack
- **Frontend**: React, Vite, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, Prisma, PostgreSQL
- **Authentication**: JWT
- **Containerization**: Docker Compose

## Setup Instructions

1. **Clone the repository** (if applicable).
2. **Install dependencies**:
   - Frontend: `cd client && npm install`
   - Backend: `cd server && npm install`
3. **Set up environment variables**:
   - Copy `server/.env.example` to `server/.env` and fill in values (e.g., DATABASE_URL, JWT_SECRET).
4. **Run Docker Compose**:
   - `docker-compose up -d` to start PostgreSQL and backend.
5. **Apply Prisma migrations**:
   - `cd server && npx prisma migrate dev`
6. **Start development servers**:
   - Frontend: `cd client && npm run dev` (runs on http://localhost:5173)
   - Backend: `cd server && npm run dev` (runs on http://localhost:5000)

## Features
- User Authentication
- Menu Management (CRUD)
- Reservation System
- Daily Reports
- Admin Dashboard

For detailed development steps, see the project documentation or contact the developer.
