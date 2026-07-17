# BookInn

**BookInn** is a modern web application for hotel searching, booking, and management. The project simplifies the booking and administration process by providing an intuitive interface for guests and a centralized control panel (dashboard) for administrators.

Users can create an account via **Sign Up** and log in via **Log In**, browse available hotels, save preferred hotels to their **Favorites** list, make new bookings, and cancel existing ones using **Cancel Booking**. For direct communication with the administrator, BookInn offers a **Contact Us** form.

Administrators have access to a dedicated **Dashboard** for centralized and efficient system management — including managing users and hotels, monitoring active bookings, reviewing cancellation requests (**Cancel Requests**), and reading messages received from users.

---

## Technologies Used

The project is built with a decoupled architecture, separating the frontend from the backend to ensure high performance and security:

| Layer | Technology |
|---|---|
| **Frontend** | React, Tailwind CSS |
| **Backend** | PHP Laravel |
| **Database** | MySQL |

---

## Key Features

### For Users
- **Secure Authentication** — Registration (**Sign Up**) and secure login (**Log In**).
- **Browse Hotels** — Explore and search available hotels.
- **Favorites List** — Save preferred hotels for quick access.
- **Bookings** — Create new bookings and cancel existing ones via **Cancel Booking**.
- **Communication** — A **Contact Us** form to send messages directly to the administrator.

### For Administrators (Admin Dashboard)
A dedicated, centralized dashboard for complete system administration:
- **User & Hotel Management** — Create, update, or delete users and hotel listings.
- **Booking Management** — Monitor all active reservations in real time.
- **Cancellation Requests** — Review, approve, or decline user **Cancel Requests**.
- **Inbox** — Read and manage messages sent by users through the contact form.

---

## Installation and Local Setup

### Prerequisites

Make sure you have the following installed on your system:
- Node.js & npm
- PHP (>= 8.x) & Composer
- MySQL (e.g., via XAMPP or a local database server)

### Backend Setup (Laravel)

Navigate to the backend directory, install dependencies, configure your database environment file, generate the app key, run the migrations, and start the local server:

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend Setup (React)

Navigate to the frontend directory, install dependencies, and start the local server:

```bash
cd frontend
npm install
npm start
```

---

## Project Structure

```
BookInn/
├── backend/     # Server-side API and logic (Laravel)
└── frontend/    # User interface (React)
```
