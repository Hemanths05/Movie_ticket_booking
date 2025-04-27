# 🎬 CineTicket - Movie Ticket Booking System

A modern, user-friendly movie ticket booking platform built with **React, Vite, Tailwind CSS**, **Node.js**, **Express.js**, **MongoDB** and **Stripe** for Payment Gateway.  
This application allows users to browse movies, select showtimes, book seats, interact with an AI chatbot for support, and complete payments securely via Stripe.

---

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Movie Browsing**: Browse latest releases, upcoming movies, and search functionality
- **Seat Selection**: Interactive seat selection interface
- **Booking Management**: View and manage your bookings
- **Admin Dashboard**: Manage movies, theaters, and bookings
- **Stripe Payment Integration**: Secure online payments for bookings
- **AI Chatbot Support**: Chatbot responds to user queries and guides them through the application
- **Responsive Design**: Fully responsive interface that works on all devices

---

## 🛠 Tech Stack

- **Frontend**: React with JavaScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router
- **HTTP Client**: Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payments**: Stripe Payment Gateway

---

## 🧩 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Hemanths05/Movie_ticket_booking
   cd Movie_ticket_booking
   ```

2. Install dependencies for both client and server:
   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```

3. Set up environment variables:  
   Create a `.env` file inside the `server` folder and add the following.
   
    ```PORT=5000
    MONGO_URI=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret
    JWT_EXPIRES_IN=1d
    STRIPE_SECRET_KEY=your-stripe-secret-key
    GEMINI_API_KEY=your-gemini-api-key
    ```


5. Start both servers:
   - Start backend server:
     ```bash
     cd server
     npm start
     ```
   - Start frontend client:
     ```bash
     cd client
     npm run dev
     ```

6. Open your browser and visit:  
   `http://localhost:5173`

---

## 👨‍💻 Demo Accounts

- **Regular User**:
  - Email: `user@example.com`
  - Password: `password`
- **Admin User**:
  - Email: `admin@example.com`
  - Password: `password`

---

## 📂 Project Structure

### Client Side (`/client`)

```
client
│
├── dist
├── node_modules
├── public
├── src
│   ├── assets
│   ├── components
│   ├── context
│   ├── data
│   ├── pages
│   ├── services
│   ├── types
│   └── utils
│
├── index.html
├── package.json
└── vite.config.ts
```

### Server Side (`/server`)

```
server
│
├── config
├── controllers
├── models
├── node_modules
├── routes
│
├── .env
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
```

---

## 📢 Key Features 

### 🎥 Movie Browsing
- Browse latest releases and upcoming movies
- Filter movies by genre
- Search functionality
- View detailed movie information

### 🎟️ Booking Process
1. Select a movie
2. Choose showtime and theater
3. Select seats
4. Complete payment
5. Receive booking confirmation

### 🛠️ Admin Features
- Manage movies, showtimes, theaters
- View and manage all bookings
- Manage users
- Adjust system settings

### 🤖 AI Chatbot
- Integrated AI chatbot that assists users by answering common queries
- Helps guide users through movie selection, booking, and payment processes
- Improves overall user experience

### 💳 Stripe Payment
- Seamless integration with Stripe for secure payments
- Accepts major debit and credit cards
- Sends confirmation upon successful transaction
  
---

## 🤖 AI Tools Utilized
- **Gemini**: Integrated for the AI chatbot to answer user queries, enhancing the support system within the application.
- **ChatGPT**: Used during development to fix errors, debug, and optimize code, ensuring smooth functionality of the application.
- **Claude**: Utilized for creating the basic UI structure and assisting with various design and development tasks to improve the user experience.

---
