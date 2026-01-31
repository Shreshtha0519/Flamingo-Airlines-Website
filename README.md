# 🦩 Flamingo Airlines - Project Review

A comprehensive full-stack airline booking platform designed for seamless flight searching, booking management, and secure payment processing.

---

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Key Features](#-key-features)
- [Configuration](#-configuration)
- [Running the Project](#-running-the-project)
- [Application Routes](#-application-routes)
- [Design & Security](#-design--security)

---

## 🦩 Project Overview
**Flamingo Airlines** is a modern web application that enables users to:
* Search for real-time flight availability.
* Select seats, passengers, and personalized meal options.
* Securely process payments and manage digital tickets.
* Access comprehensive travel guidelines and airport information.

---

## 📊 Technology Stack

### Frontend
- **Framework:** React 19.2.0 (Vite 7.2.4)
- **Routing:** React Router DOM 7.12.0
- **Styling:** TailwindCSS 3.4.19
- **Animations:** Framer Motion 12.26.2
- **HTTP Client:** Axios 1.13.2
- **Dev Server:** `http://localhost:5173`

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5.2.1
- **Database:** MySQL (via `mysql2` 3.16.1)
- **Authentication:** JWT (`jsonwebtoken` 9.0.3) & `bcryptjs` 3.0.3
- **Security:** CORS-enabled
- **Dev Server:** `http://localhost:5000`

### Database
- **Type:** MySQL
- **Name:** `flamingo_airlines`
- **Host:** `localhost:3306`
- **Connection:** Managed via Pool (10 max connections)

---

## 🏗️ Project Structure

### Backend
```text
backend/
├── config/             # MySQL connection pool configuration
├── controllers/        # Business logic (Auth, Booking, Flight, Payment)
├── middleware/         # Auth guards and custom middleware
├── routes/             # API Route definitions
├── .env                # Environment variables
├── server.js           # Entry point
└── package.json
```

### Frontend
```text
frontend/
├── src/
│   ├── components/     # Reusable UI components (Navbar, Hero, etc.)
│   ├── pages/          # 21 Page views (Search, Booking, Payment, etc.)
│   ├── context/        # AuthContext for state management
│   ├── services/       # API service layer (Axios instances)
│   ├── animations/     # Framer Motion presets
│   ├── App.jsx         # Routing & Layout
│   └── main.jsx        # React entry point
└── tailwind.config.js
```
