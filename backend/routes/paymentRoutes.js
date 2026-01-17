const express = require('express');
const router = express.Router();
const {
  makePayment,
  getPaymentByBookingId,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Protected route (require JWT authentication)
router.post('/', protect, makePayment);

// Public route (anyone can check payment status with booking ID)
router.get('/:bookingId', getPaymentByBookingId);

module.exports = router;
