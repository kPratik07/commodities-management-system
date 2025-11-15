# Commodities Management System

A small full‑stack app to manage store commodities with role‑based access.
Managers get a dashboard and full product control; Store Keepers manage inventory only.

## Tech Stack

- **Frontend**: React, Vite, React Router, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT

---

## Feature Summary

- **Authentication & Roles**
  - Email/password auth with JWT.
  - Roles: `MANAGER` and `STORE_KEEPER`.
  - Signup page + OTP‑based forgot/reset password (via Gmail App Password).

- **Access Rules**
  - **Signup / Login**: both roles.
  - **Dashboard**: Manager only.
  - **View Products**: Manager & Store Keeper.
  - **Add/Edit Products**: Manager & Store Keeper.

- **Dashboard (Manager only)**
  - Total products.
  - Total stock units.
  - Total inventory value.
  - Low‑stock items count (stock ≤ 10).

- **Products**
  - List products with name, category, price, stock, unit, status.
  - Status badges: In stock / Low stock / Out of stock.
  - Add and edit products from the UI.

- **UI & UX**
  - Light/Dark mode (sun/moon toggle, stored in `localStorage`).
  - Role‑based navigation (Dashboard hidden for Store Keeper).
  - Protected routes and role guards.
  - Responsive layout for mobile, tablet, and desktop.

---

## Prerequisites

- Node.js (LTS)
- npm
- A MongoDB connection string (Atlas or local)

Use `backend/.env.example` as a reference.

---

## Environment Setup

### Backend `.env`

In `backend/.env` (do **not** commit this file), set:

```env
MONGODB_URI="<your-mongodb-uri-with-db-name>"
JWT_SECRET=your_strong_jwt_secret_here
JWT_EXPIRE=7d
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_app_password_here   # Google App Password
EMAIL_FROM=your_email@example.com
FRONTEND_URL=http://localhost:5173
PORT=5000
NODE_ENV=development
```

Example for MongoDB Atlas:

```env
MONGODB_URI="mongodb+srv://<user>:<password>@cluster1.mongodb.net/commodities-db"
```

---

## Install & Run

### Backend

```bash
cd backend
npm install
npm run seed   # create sample users and products
npm run dev    # http://localhost:5000
```

Seed users:

- Manager: `manager@slooze.xyz` / `Password123`
- Store Keeper: `keeper@slooze.xyz` / `Password123`

### Frontend

```bash
cd frontend
npm install
npm run dev    # http://localhost:5173
```

Make sure the backend is running before opening the frontend.

---

## Usage

1. Open `http://localhost:5173` in your browser.
2. Either **sign up** (recommended) or use a seeded account to log in.
3. As **Manager**:
   - Access **Dashboard** and **Products**.
4. As **Store Keeper**:
   - Access **Products** only.
5. To reset password:
   - Click **Forgot password?**, enter your email, then use the OTP on the reset screen.
6. Toggle light/dark mode using the sun/moon icon in the header.

---

Built by **Pratik Raj** ❤️
