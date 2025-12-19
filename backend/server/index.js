require('dotenv').config();
const express = require('express');
const cors = require('cors');
const askAthenaRoute = require('./routes/askAthena');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', askAthenaRoute);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Athena Merchant Assistant API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Athena Merchant Assistant API running on port ${PORT}`);
});
