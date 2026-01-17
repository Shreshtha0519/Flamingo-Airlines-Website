const { pool } = require('../config/db');

// @desc    Get all flights
// @route   GET /api/flights
// @access  Public
const getFlights = async (req, res) => {
  try {
    const [flights] = await pool.query(
      'SELECT * FROM flights ORDER BY departure_time ASC'
    );

    res.json({
      count: flights.length,
      flights,
    });
  } catch (error) {
    console.error('Get flights error:', error);
    res.status(500).json({ error: 'Server error fetching flights' });
  }
};

// @desc    Get single flight by ID
// @route   GET /api/flights/:id
// @access  Public
const getFlightById = async (req, res) => {
  try {
    const { id } = req.params;

    const [flights] = await pool.query(
      'SELECT * FROM flights WHERE id = ?',
      [id]
    );

    if (flights.length === 0) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    res.json({ flight: flights[0] });
  } catch (error) {
    console.error('Get flight by ID error:', error);
    res.status(500).json({ error: 'Server error fetching flight' });
  }
};

// @desc    Search flights
// @route   GET /api/flights/search
// @access  Public
const searchFlights = async (req, res) => {
  try {
    const { source, destination, departureDate, flightType } = req.query;

    // Build dynamic query
    let query = 'SELECT * FROM flights WHERE 1=1';
    const params = [];

    if (source) {
      query += ' AND source LIKE ?';
      params.push(`%${source}%`);
    }

    if (destination) {
      query += ' AND destination LIKE ?';
      params.push(`%${destination}%`);
    }

    if (departureDate) {
      query += ' AND DATE(departure_time) = ?';
      params.push(departureDate);
    }

    if (flightType) {
      query += ' AND flight_type = ?';
      params.push(flightType);
    }

    query += ' ORDER BY departure_time ASC';

    const [flights] = await pool.query(query, params);

    res.json({
      count: flights.length,
      flights,
    });
  } catch (error) {
    console.error('Search flights error:', error);
    res.status(500).json({ error: 'Server error searching flights' });
  }
};

// @desc    Create a new flight (Admin only)
// @route   POST /api/flights
// @access  Private/Admin
const createFlight = async (req, res) => {
  try {
    const {
      flightNumber,
      source,
      destination,
      departureTime,
      arrivalTime,
      price,
      flightType,
    } = req.body;

    // Validate required fields
    if (!flightNumber || !source || !destination || !departureTime || !arrivalTime || !price) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const [result] = await pool.query(
      `INSERT INTO flights (flight_number, source, destination, departure_time, arrival_time, price, flight_type)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [flightNumber, source, destination, departureTime, arrivalTime, price, flightType || 'Domestic']
    );

    res.status(201).json({
      message: 'Flight created successfully',
      flight: {
        id: result.insertId,
        flightNumber,
        source,
        destination,
        departureTime,
        arrivalTime,
        price,
        flightType: flightType || 'Domestic',
      },
    });
  } catch (error) {
    console.error('Create flight error:', error);
    res.status(500).json({ error: 'Server error creating flight' });
  }
};

// @desc    Update a flight (Admin only)
// @route   PUT /api/flights/:id
// @access  Private/Admin
const updateFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      flightNumber,
      source,
      destination,
      departureTime,
      arrivalTime,
      price,
      flightType,
    } = req.body;

    // Check if flight exists
    const [existingFlights] = await pool.query('SELECT * FROM flights WHERE id = ?', [id]);

    if (existingFlights.length === 0) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    await pool.query(
      `UPDATE flights SET 
        flight_number = COALESCE(?, flight_number),
        source = COALESCE(?, source),
        destination = COALESCE(?, destination),
        departure_time = COALESCE(?, departure_time),
        arrival_time = COALESCE(?, arrival_time),
        price = COALESCE(?, price),
        flight_type = COALESCE(?, flight_type)
       WHERE id = ?`,
      [flightNumber, source, destination, departureTime, arrivalTime, price, flightType, id]
    );

    res.json({ message: 'Flight updated successfully' });
  } catch (error) {
    console.error('Update flight error:', error);
    res.status(500).json({ error: 'Server error updating flight' });
  }
};

// @desc    Delete a flight (Admin only)
// @route   DELETE /api/flights/:id
// @access  Private/Admin
const deleteFlight = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if flight exists
    const [existingFlights] = await pool.query('SELECT * FROM flights WHERE id = ?', [id]);

    if (existingFlights.length === 0) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    await pool.query('DELETE FROM flights WHERE id = ?', [id]);

    res.json({ message: 'Flight deleted successfully' });
  } catch (error) {
    console.error('Delete flight error:', error);
    res.status(500).json({ error: 'Server error deleting flight' });
  }
};

module.exports = {
  getFlights,
  getFlightById,
  searchFlights,
  createFlight,
  updateFlight,
  deleteFlight,
};
