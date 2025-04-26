const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/authRoutes.js');
const theaterRoutes = require('./routes/theaterRoutes.js');
const showTimeRoutes = require('./routes/showtimeRoutes.js');
const paymentRoutes = require('./routes/payment');
const bookingRoutes = require('./routes/bookings.js');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
connectDB();
const app = express();
const allowedOrigins = [
    'https://movie-ticket-booking-git-master-hemanth-ss-projects.vercel.app',
    'https://movie-ticket-booking-0igc.onrender.com',
    'http://cineticketmovieticketbooking.s3-website.eu-north-1.amazonaws.com'
  ];
  
app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));
  
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/admin/movies', movieRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/showtimes', showTimeRoutes);
app.use('/api/payment', paymentRoutes);
app.use("/api/bookings", bookingRoutes);
app.use('/api/admin', adminRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0', () => console.log(`Server running on port ${PORT}`));
