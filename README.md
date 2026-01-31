# 🦩 Flamingo Airlines - Project Review

A comprehensive full-stack airline booking platform designed for seamless flight searching, booking management, and secure payment processing.

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
🎯 Key Features
---------------

### User-Facing Features

1.  **Flight Booking Flow**
    
    *   Search flights by origin, destination, and dates
        
    *   View available flights with pricing
        
    *   Select seats and passengers
        
    *   Choose meal options
        
    *   Complete payment
        
    *   Receive booking confirmation
        
2.  **User Authentication**
    
    *   User registration and login
        
    *   JWT-based session management
        
    *   Protected routes for authenticated users
        
3.  **Booking Management**
    
    *   View booking details
        
    *   Cancel tickets
        
    *   Refund processing
        
4.  **Information Pages**
    
    *   Flight schedules
        
    *   Fare and baggage information
        
    *   Meal options
        
    *   International travel guidelines
        
    *   Airport information
        
    *   Safety and trust information
        
    *   Help center
        
    *   Refund policy
        
    *   Contact page
        
    *   About us
        

### Backend API Endpoints

#### Authentication (/api/auth)

*   User registration
    
*   User login
    
*   Token validation
    

#### Flights (/api/flights)

*   Search available flights
    
*   Get flight details
    
*   View flight schedules
    

#### Bookings (/api/bookings)

*   Create new booking
    
*   Get user bookings
    
*   Get booking details
    
*   Cancel booking
    

#### Payments (/api/payments)

*   Process payment
    
*   Verify payment status
    
*   Handle refunds

## 🔧 Configuration

### Environment Variables (Backend)

PORT=5000

NODE\_ENV=development

DB\_HOST=localhost

DB\_USER=root

DB\_PASSWORD=Sdk@dam5

DB\_NAME=flamingo\_airlines

DB\_PORT=3306

JWT\_SECRET=flamingo\_secret\_key

FRONTEND\_URL=http://localhost:5173

### Dependencies Installed

*   ✅ Frontend: node\_modules present
    
*   ✅ Backend: node\_modules present
    

🚀 Running the Project
----------------------

### Prerequisites

1.  **Node.js** installed
    
2.  **MySQL** server running
    
3.  **Database** flamingo\_airlines created and configured
    

### Steps to Run

1.  **Start MySQL** server (ensure it's running on port 3306)
2.  **Start Backend** (in `/backend` directory):
    
    npm run dev  \# or npm start
    
3.  **Start Frontend** (in `/frontend` directory):
    
    npm run dev
    
4.  **Access Application**: `http://localhost:5173`
    
## 📱 Application Routes

| Route | Description |
| --- | --- |
| / | Landing page with hero and features |
| /login | User login |
| /signup | User registration |
| /search | Flight search interface |
| /flights | Flight results listing |
| /booking | Booking details form |
| /meals | Meal selection |
| /payment | Payment processing |
| /confirmation | Booking confirmation |
| /cancel | Ticket cancellation |
| /schedule | Flight schedules |
| /fares | Fare and baggage info |
| /meal-options | Available meal options |
| /international-travel | Travel guidelines |
| /airports | Airport information |
| /safety | Safety information |
| /help | Help center |
| /refund-policy | Refund policy |
| /contact | Contact page |
| /about | About us |

* * *

🎨 Design Features
------------------

*   **Modern UI** with TailwindCSS styling
    
*   **Smooth Animations** using Framer Motion
    
*   **Responsive Design** for mobile and desktop
    
*   **Component-based Architecture** for maintainability
    
*   **Context API** for state management
    
*   **Protected Routes** for authentication
    

🔒 Security Features
--------------------

*   **Password Hashing** with bcryptjs
    
*   **JWT Authentication** for secure sessions
    
*   **CORS Protection** configured
    
*   **Environment Variables** for sensitive data
    
*   **Protected API Routes** with middleware
