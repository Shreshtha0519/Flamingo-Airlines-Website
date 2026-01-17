import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock flight data
const mockFlights = [
  {
    id: 1,
    airline: 'Flamingo Airlines',
    airlineLogo: '🦩',
    flightNumber: 'FL-201',
    from: { city: 'New York', code: 'JFK', time: '08:00' },
    to: { city: 'London', code: 'LHR', time: '20:15' },
    duration: '7h 15m',
    stops: 0,
    price: 459,
    class: 'Economy',
    seatsLeft: 12,
    amenities: ['wifi', 'meal', 'entertainment', 'usb'],
  },
  {
    id: 2,
    airline: 'Flamingo Airlines',
    airlineLogo: '🦩',
    flightNumber: 'FL-305',
    from: { city: 'New York', code: 'JFK', time: '14:30' },
    to: { city: 'London', code: 'LHR', time: '03:00' },
    duration: '7h 30m',
    stops: 0,
    price: 389,
    class: 'Economy',
    seatsLeft: 5,
    amenities: ['wifi', 'meal', 'usb'],
  },
  {
    id: 3,
    airline: 'SkyWings',
    airlineLogo: '🦅',
    flightNumber: 'SW-118',
    from: { city: 'New York', code: 'JFK', time: '10:45' },
    to: { city: 'London', code: 'LHR', time: '00:30' },
    duration: '8h 45m',
    stops: 1,
    stopCity: 'Dublin',
    price: 325,
    class: 'Economy',
    seatsLeft: 23,
    amenities: ['wifi', 'meal'],
  },
  {
    id: 4,
    airline: 'Flamingo Airlines',
    airlineLogo: '🦩',
    flightNumber: 'FL-501',
    from: { city: 'New York', code: 'JFK', time: '19:00' },
    to: { city: 'London', code: 'LHR', time: '07:00' },
    duration: '7h 00m',
    stops: 0,
    price: 649,
    class: 'Business',
    seatsLeft: 8,
    amenities: ['wifi', 'meal', 'entertainment', 'usb', 'lounge'],
  },
  {
    id: 5,
    airline: 'AeroJet',
    airlineLogo: '✈️',
    flightNumber: 'AJ-442',
    from: { city: 'New York', code: 'JFK', time: '06:15' },
    to: { city: 'London', code: 'LHR', time: '19:45' },
    duration: '8h 30m',
    stops: 1,
    stopCity: 'Reykjavik',
    price: 299,
    class: 'Economy',
    seatsLeft: 31,
    amenities: ['meal', 'usb'],
  },
  {
    id: 6,
    airline: 'Flamingo Airlines',
    airlineLogo: '🦩',
    flightNumber: 'FL-777',
    from: { city: 'New York', code: 'JFK', time: '22:00' },
    to: { city: 'London', code: 'LHR', time: '10:00' },
    duration: '7h 00m',
    stops: 0,
    price: 899,
    class: 'First Class',
    seatsLeft: 3,
    amenities: ['wifi', 'meal', 'entertainment', 'usb', 'lounge', 'bed'],
  },
];

const amenityIcons = {
  wifi: { icon: '📶', label: 'Free WiFi' },
  meal: { icon: '🍽️', label: 'In-flight Meal' },
  entertainment: { icon: '🎬', label: 'Entertainment' },
  usb: { icon: '🔌', label: 'USB Charging' },
  lounge: { icon: '🛋️', label: 'Lounge Access' },
  bed: { icon: '🛏️', label: 'Lie-flat Bed' },
};

const FlightResults = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('recommended');
  const [filterStops, setFilterStops] = useState('all');
  const [selectedFlight, setSelectedFlight] = useState(null);

  // Filter and sort flights
  const filteredFlights = mockFlights
    .filter(flight => {
      if (filterStops === 'all') return true;
      if (filterStops === 'nonstop') return flight.stops === 0;
      if (filterStops === '1stop') return flight.stops === 1;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
      if (sortBy === 'departure') return a.from.time.localeCompare(b.from.time);
      return 0; // recommended - default order
    });

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight.id);
    // Navigate to booking details after a short delay for animation
    setTimeout(() => {
      navigate('/booking', { state: { flight } });
    }, 300);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-fuchsia-600/10 to-pink-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <span>✈️</span>
              <span>New York (JFK)</span>
              <span>→</span>
              <span>London (LHR)</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Available <span className="gradient-text">Flights</span>
            </h1>
            <p className="text-gray-400">
              {filteredFlights.length} flights found • Jan 25, 2026
            </p>
          </motion.div>

          {/* Filters & Sort */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/5"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Stops Filter */}
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm">Stops:</span>
                <div className="flex gap-2">
                  {[
                    { value: 'all', label: 'All' },
                    { value: 'nonstop', label: 'Non-stop' },
                    { value: '1stop', label: '1 Stop' },
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilterStops(option.value)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        filterStops === option.value
                          ? 'gradient-btn text-white'
                          : 'bg-slate-700/50 text-gray-400 hover:text-white'
                      }`}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-700/50 text-white px-4 py-2 rounded-full text-sm border border-white/10 focus:border-violet-500 focus:outline-none cursor-pointer"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price">Price: Low to High</option>
                  <option value="duration">Duration: Shortest</option>
                  <option value="departure">Departure Time</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Flight Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <AnimatePresence>
              {filteredFlights.map((flight, index) => (
                <motion.div
                  key={flight.id}
                  variants={cardVariants}
                  layout
                  whileHover={{ scale: 1.01, y: -2 }}
                  className={`bg-slate-800/60 backdrop-blur-sm rounded-2xl border transition-all duration-300 overflow-hidden ${
                    selectedFlight === flight.id
                      ? 'border-violet-500 shadow-lg shadow-violet-500/20'
                      : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      {/* Airline Info */}
                      <div className="flex items-center gap-4 lg:w-48">
                        <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center text-3xl shadow-lg">
                          {flight.airlineLogo}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{flight.airline}</h3>
                          <p className="text-gray-500 text-sm">{flight.flightNumber}</p>
                        </div>
                      </div>

                      {/* Flight Times */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between lg:justify-center gap-4">
                          {/* Departure */}
                          <div className="text-center">
                            <p className="text-2xl font-bold text-white">{flight.from.time}</p>
                            <p className="text-gray-400 text-sm">{flight.from.code}</p>
                          </div>

                          {/* Duration & Route */}
                          <div className="flex-1 max-w-xs px-4">
                            <div className="flex items-center gap-2">
                              <div className="h-px flex-1 bg-gradient-to-r from-violet-500/50 to-transparent"></div>
                              <div className="relative">
                                <motion.span
                                  animate={{ x: [0, 10, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="text-lg"
                                >
                                  ✈️
                                </motion.span>
                              </div>
                              <div className="h-px flex-1 bg-gradient-to-l from-fuchsia-500/50 to-transparent"></div>
                            </div>
                            <div className="text-center mt-1">
                              <p className="text-gray-400 text-xs">{flight.duration}</p>
                              <p className={`text-xs ${flight.stops === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                                {flight.stopCity && ` (${flight.stopCity})`}
                              </p>
                            </div>
                          </div>

                          {/* Arrival */}
                          <div className="text-center">
                            <p className="text-2xl font-bold text-white">{flight.to.time}</p>
                            <p className="text-gray-400 text-sm">{flight.to.code}</p>
                          </div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="hidden md:flex items-center gap-2 lg:w-40 justify-center">
                        {flight.amenities.slice(0, 4).map((amenity) => (
                          <div
                            key={amenity}
                            className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center text-sm"
                            title={amenityIcons[amenity]?.label}
                          >
                            {amenityIcons[amenity]?.icon}
                          </div>
                        ))}
                        {flight.amenities.length > 4 && (
                          <span className="text-gray-500 text-xs">+{flight.amenities.length - 4}</span>
                        )}
                      </div>

                      {/* Price & Select */}
                      <div className="flex items-center justify-between lg:justify-end gap-4 lg:w-48">
                        <div className="text-right">
                          <p className="text-sm text-gray-400">{flight.class}</p>
                          <p className="text-2xl font-bold text-white">
                            ${flight.price}
                          </p>
                          <p className={`text-xs ${flight.seatsLeft <= 5 ? 'text-red-400' : 'text-gray-500'}`}>
                            {flight.seatsLeft <= 5 ? `🔥 Only ${flight.seatsLeft} left` : `${flight.seatsLeft} seats left`}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSelectFlight(flight)}
                          className="gradient-btn text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-shadow"
                        >
                          Select
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details (hover reveal) */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    whileHover={{ height: 'auto', opacity: 1 }}
                    className="bg-slate-900/50 border-t border-white/5 overflow-hidden"
                  >
                    <div className="p-4 flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>📍</span>
                        <span>{flight.from.city} → {flight.to.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>💺</span>
                        <span>{flight.class}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>🧳</span>
                        <span>23kg baggage included</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-400">
                        <span>✓</span>
                        <span>Free cancellation</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredFlights.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <span className="text-6xl mb-4 block">🔍</span>
              <h3 className="text-xl font-semibold text-white mb-2">No flights found</h3>
              <p className="text-gray-400">Try adjusting your filters</p>
            </motion.div>
          )}

          {/* Price Alert Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-6 border border-violet-500/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center text-2xl">
                  🔔
                </div>
                <div>
                  <h3 className="text-white font-semibold">Set Price Alert</h3>
                  <p className="text-gray-400 text-sm">Get notified when prices drop for this route</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Create Alert
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FlightResults;
