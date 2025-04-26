const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51RBJYsFwJt3goCLz5KrAsOBmtdPPy3Vn0uyhnRiHkP9tVqOTXsKgTR10cQLBrMeJfT9EFqq7n2hV00E1gKlDDiBR00lkVMS5zk'); 

router.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount, 
        currency: 'inr',
        payment_method_types: ['card'],
      });
  
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;
