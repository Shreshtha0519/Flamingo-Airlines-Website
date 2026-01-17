const { pool } = require('../config/db');

// @desc    Make a payment for a booking
// @route   POST /api/payments
// @access  Private
const makePayment = async (req, res) => {
  try {
    const { booking_id, payment_mode, amount } = req.body;
    const user_id = req.user.id;

    // Validate required fields
    if (!booking_id || !payment_mode || !amount) {
      return res.status(400).json({ 
        error: 'Please provide all required fields: booking_id, payment_mode, amount' 
      });
    }

    // Check if booking exists and belongs to the user
    const [bookings] = await pool.query(
      'SELECT * FROM bookings WHERE id = ?',
      [booking_id]
    );

    if (bookings.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const booking = bookings[0];

    // Verify booking belongs to user (or user is admin)
    if (booking.user_id !== user_id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to make payment for this booking' });
    }

    // Check if payment already exists for this booking
    const [existingPayments] = await pool.query(
      'SELECT * FROM payments WHERE booking_id = ? AND payment_status = ?',
      [booking_id, 'SUCCESS']
    );

    if (existingPayments.length > 0) {
      return res.status(400).json({ error: 'Payment already completed for this booking' });
    }

    // Simulate payment processing (in real app, integrate with payment gateway)
    const paymentSuccess = true; // Simulated success
    const payment_status = paymentSuccess ? 'SUCCESS' : 'FAILED';

    // Create payment record
    const [result] = await pool.query(
      `INSERT INTO payments (booking_id, payment_mode, amount, payment_status) 
       VALUES (?, ?, ?, ?)`,
      [booking_id, payment_mode, amount, payment_status]
    );

    // If payment successful, update booking status to CONFIRMED
    if (paymentSuccess) {
      await pool.query(
        'UPDATE bookings SET status = ? WHERE id = ?',
        ['CONFIRMED', booking_id]
      );
    }

    // Fetch the created payment
    const [payment] = await pool.query(
      `SELECT p.*, b.pnr, b.flight_id 
       FROM payments p 
       LEFT JOIN bookings b ON p.booking_id = b.id 
       WHERE p.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      message: paymentSuccess ? 'Payment successful' : 'Payment failed',
      payment: payment[0],
    });
  } catch (error) {
    console.error('Make payment error:', error);
    res.status(500).json({ error: 'Server error while processing payment' });
  }
};

// @desc    Get payment by booking ID
// @route   GET /api/payments/:bookingId
// @access  Public
const getPaymentByBookingId = async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({ error: 'Booking ID is required' });
    }

    const [payments] = await pool.query(
      `SELECT p.*, b.pnr, b.flight_id, b.status as booking_status
       FROM payments p 
       LEFT JOIN bookings b ON p.booking_id = b.id 
       WHERE p.booking_id = ?
       ORDER BY p.created_at DESC`,
      [bookingId]
    );

    if (payments.length === 0) {
      return res.status(404).json({ error: 'No payments found for this booking' });
    }

    res.status(200).json({
      message: 'Payments retrieved successfully',
      payments,
    });
  } catch (error) {
    console.error('Get payment error:', error);
    res.status(500).json({ error: 'Server error while fetching payment' });
  }
};

module.exports = {
  makePayment,
  getPaymentByBookingId,
};
