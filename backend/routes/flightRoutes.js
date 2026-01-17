const express = require('express');
const router = express.Router();
const {
  getFlights,
  getFlightById,
  searchFlights,
  createFlight,
  updateFlight,
  deleteFlight,
} = require('../controllers/flightController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getFlights);
router.get('/search', searchFlights);
router.get('/:id', getFlightById);

// Protected routes (Admin only)
router.post('/', protect, createFlight);
router.put('/:id', protect, updateFlight);
router.delete('/:id', protect, deleteFlight);

module.exports = router;
