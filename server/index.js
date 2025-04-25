const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/authRoutes.js');
const theaterRoutes = require('./routes/theaterRoutes.js');
const showTimeRoutes = require('./routes/showtimeRoutes.js');
// const Stripe = require('stripe');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/showtimes', showTimeRoutes);
// app.post('/api/create-payment-intent', async (req, res) => {
//     const { amount } = req.body;
  
//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: amount * 100, 
//         currency: 'inr',
//       });
  
//       res.send({ clientSecret: paymentIntent.client_secret });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
