const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookingByPNR,
  cancelBookingByPNR,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Protected routes (require JWT authentication)
router.post('/', protect, createBooking);
router.put('/cancel/:pnr', protect, cancelBookingByPNR);

// Public route (anyone can check booking status with PNR)
router.get('/:pnr', getBookingByPNR);

module.exports = router;
