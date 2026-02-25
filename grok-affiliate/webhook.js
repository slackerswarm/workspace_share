require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  // From TOOLS.md
const fs = require('fs');
const app = express();

app.use(express.raw({ type: 'application/json' }));

app.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    if (event.type === 'checkout.session.completed' || event.type === 'payout.paid') {  // Track referrals/payouts
      const data = event.data.object;
      fs.appendFileSync('logs.txt', `${new Date()}: Stripe event: ${event.type} - Amount: ${data.amount_total / 100} USD (Ref ID: ${data.id})\n`);
      // Add tracking logic (e.g., update DB or notify via message tool)
    }
    res.json({ received: true });
  } catch (err) {
    fs.appendFileSync('logs.txt', `${new Date()}: Webhook error: ${err.message}\n`);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

app.listen(3000, () => console.log('Webhook server running on port 3000'));