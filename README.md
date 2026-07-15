# BookInn 

**BookInn** is a modern web application designed for hotel searching, booking, and management. The project simplifies the booking process and administration by providing an intuitive user interface for guests and a centralized control panel (dashboard) for administrators.

---

## Technologies Used

The project is built with a decoupled architecture, separating the frontend and backend to ensure high performance and security:

*   **Frontend:** React, Tailwind CSS
*   **Backend:** PHP Laravel
*   **Database:** MySQL

---

## Key Features

### For Users
*   **Secure Authentication:** User registration (**Sign Up**) and secure login (**Log In**).
*   **Browse Hotels:** Explore and search through available hotels.
*   **Favorites List:** Save preferred hotels to a **Favorites** list for quick access.
*   **Bookings:** Make new bookings and easily cancel existing ones using **Cancel Booking**.
*   **Communication:** A seamless **Contact Us** form to send direct messages to the administrator.

### For Administrators (Admin Dashboard)
A dedicated, centralized dashboard for complete system administration:
*   **User & Hotel Management:** Create, update, or delete users and hotel listings.
*   **Booking Management:** Monitor all active reservations in real-time.
*   **Cancellation Requests:** Review and approve or decline user **Cancel Requests**.
*   **Inbox:** Read and manage messages sent by users through the contact form.

---

## Installation and Local Setup

### Prerequisites
Make sure you have the following installed on your system:
*   Node.js & npm
*   PHP (>= 8.x) & Composer
*   MySQL (e.g., via XAMPP or a local database server)

### Backend Setup (Laravel)
1. Navigate to the backend directory:
   ```bash
   cd backend
