const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Flamingo Airlines API',
    status: 'running',
    version: '1.0.0',
  });
});

// API routes placeholder
app.get('/api', (req, res) => {
  res.json({
    message: 'Flamingo Airlines API',
    endpoints: {
      flights: '/api/flights',
      bookings: '/api/bookings',
      users: '/api/users',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🦩 Flamingo Airlines API running on http://localhost:${PORT}`);
});
