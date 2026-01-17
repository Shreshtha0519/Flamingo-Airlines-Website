const { pool } = require('../config/db');

// Generate unique PNR (6 alphanumeric characters)
const generatePNR = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pnr = '';
  for (let i = 0; i < 6; i++) {
    pnr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pnr;
};

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { flight_id } = req.body;
    const user_id = req.user.id;

    // Validate required fields
    if (!flight_id) {
      return res.status(400).json({ error: 'Flight ID is required' });
    }

    // Check if flight exists
    const [flights] = await pool.query(
      'SELECT id FROM flights WHERE id = ?',
      [flight_id]
    );

    if (flights.length === 0) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    // Generate unique PNR
    let pnr;
    let pnrExists = true;
    
    while (pnrExists) {
      pnr = generatePNR();
      const [existing] = await pool.query(
        'SELECT id FROM bookings WHERE pnr = ?',
        [pnr]
      );
      pnrExists = existing.length > 0;
    }

    // Create booking
    const [result] = await pool.query(
      `INSERT INTO bookings (pnr, user_id, flight_id) VALUES (?, ?, ?)`,
      [pnr, user_id, flight_id]
    );

    // Fetch the created booking
    const [booking] = await pool.query(
      `SELECT b.*, f.flight_number, f.source, f.destination, f.departure_time, f.arrival_time 
       FROM bookings b 
       LEFT JOIN flights f ON b.flight_id = f.id 
       WHERE b.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      message: 'Booking created successfully',
      booking: booking[0],
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Server error while creating booking' });
  }
};

// @desc    Get booking by PNR
// @route   GET /api/bookings/:pnr
// @access  Public
const getBookingByPNR = async (req, res) => {
  try {
    const { pnr } = req.params;

    if (!pnr) {
      return res.status(400).json({ error: 'PNR is required' });
    }

    const [bookings] = await pool.query(
      `SELECT b.*, f.flight_number, f.source, f.destination, f.departure_time, f.arrival_time,
              u.name as passenger_name, u.email as passenger_email
       FROM bookings b 
       LEFT JOIN flights f ON b.flight_id = f.id 
       LEFT JOIN users u ON b.user_id = u.id
       WHERE b.pnr = ?`,
      [pnr.toUpperCase()]
    );

    if (bookings.length === 0) {
      return res.status(404).json({ error: 'Booking not found with this PNR' });
    }

    res.status(200).json({
      message: 'Booking retrieved successfully',
      booking: bookings[0],
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Server error while fetching booking' });
  }
};

// @desc    Cancel booking by PNR
// @route   PUT /api/bookings/cancel/:pnr
// @access  Private
const cancelBookingByPNR = async (req, res) => {
  try {
    const { pnr } = req.params;
    const user_id = req.user.id;

    if (!pnr) {
      return res.status(400).json({ error: 'PNR is required' });
    }

    // Check if booking exists and belongs to the user
    const [bookings] = await pool.query(
      'SELECT * FROM bookings WHERE pnr = ?',
      [pnr.toUpperCase()]
    );

    if (bookings.length === 0) {
      return res.status(404).json({ error: 'Booking not found with this PNR' });
    }

    const booking = bookings[0];

    // Check if user owns this booking (or is admin)
    if (booking.user_id !== user_id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to cancel this booking' });
    }

    // Check if already cancelled
    if (booking.status === 'CANCELLED') {
      return res.status(400).json({ error: 'Booking is already cancelled' });
    }

    // Update booking status to CANCELLED
    await pool.query(
      'UPDATE bookings SET status = ? WHERE pnr = ?',
      ['CANCELLED', pnr.toUpperCase()]
    );

    // Fetch updated booking
    const [updatedBooking] = await pool.query(
      `SELECT b.*, f.flight_number, f.source, f.destination, f.departure_time, f.arrival_time
       FROM bookings b 
       LEFT JOIN flights f ON b.flight_id = f.id 
       WHERE b.pnr = ?`,
      [pnr.toUpperCase()]
    );

    res.status(200).json({
      message: 'Booking cancelled successfully',
      booking: updatedBooking[0],
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'Server error while cancelling booking' });
  }
};

module.exports = {
  createBooking,
  getBookingByPNR,
  cancelBookingByPNR,
};
