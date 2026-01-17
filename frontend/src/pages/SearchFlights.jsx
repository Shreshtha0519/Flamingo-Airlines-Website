import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SearchFlights = () => {
  const [tripType, setTripType] = useState('oneway');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    class: 'economy'
  });
  const [isFromFocused, setIsFromFocused] = useState(false);
  const [isToFocused, setIsToFocused] = useState(false);

  // Popular cities for suggestions
  const popularCities = [
    { code: 'NYC', name: 'New York', country: 'USA', icon: '🗽' },
    { code: 'LON', name: 'London', country: 'UK', icon: '🇬🇧' },
    { code: 'PAR', name: 'Paris', country: 'France', icon: '🗼' },
    { code: 'DXB', name: 'Dubai', country: 'UAE', icon: '🏙️' },
    { code: 'TYO', name: 'Tokyo', country: 'Japan', icon: '🗾' },
    { code: 'SIN', name: 'Singapore', country: 'Singapore', icon: '🇸🇬' },
    { code: 'SYD', name: 'Sydney', country: 'Australia', icon: '🇦🇺' },
    { code: 'DEL', name: 'New Delhi', country: 'India', icon: '🇮🇳' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCitySelect = (field, city) => {
    setFormData(prev => ({ ...prev, [field]: `${city.name} (${city.code})` }));
    setIsFromFocused(false);
    setIsToFocused(false);
  };

  const swapLocations = () => {
    setFormData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to flight results page
    console.log('Search flights:', formData);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      {/* Hero Section with Search Form */}
      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 animate-gradient"></div>

        {/* Animated Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-600/30 to-indigo-600/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-fuchsia-600/20 to-pink-600/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"
          />
        </div>

        {/* Animated Plane */}
        <motion.div
          initial={{ x: '-100%', y: '100%' }}
          animate={{ x: '200%', y: '-100%' }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute text-4xl opacity-20 pointer-events-none"
        >
          ✈️
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-12"
          >
            <motion.div variants={itemVariants} className="flex justify-center gap-4 mb-6">
              <span className="text-3xl opacity-50 animate-float">✈️</span>
              <span className="text-4xl animate-float-delayed">🌍</span>
              <span className="text-3xl opacity-50 animate-float">✈️</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              Where would you like to
              <br />
              <span className="gradient-text">fly today?</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 max-w-xl mx-auto text-lg"
            >
              Search thousands of flights and find the perfect journey for your adventure
            </motion.p>
          </motion.div>

          {/* Search Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-slate-800/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto border border-white/10"
          >
            {/* Trip Type Selection */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2 bg-slate-700/50 rounded-full p-1.5">
                {['oneway', 'round', 'multi'].map((type) => (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setTripType(type)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      tripType === type
                        ? 'gradient-btn text-white shadow-lg'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {type === 'oneway' && '● One Way'}
                    {type === 'round' && '◐ Round Trip'}
                    {type === 'multi' && '◉ Multi City'}
                  </motion.button>
                ))}
              </div>

              {/* Class Selection */}
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm">Class:</span>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  className="bg-slate-700/50 text-white px-4 py-2.5 rounded-full text-sm border border-white/10 focus:border-violet-500 focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="economy">💺 Economy</option>
                  <option value="premium">🌟 Premium Economy</option>
                  <option value="business">💼 Business</option>
                  <option value="first">👑 First Class</option>
                </select>
              </div>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
                {/* From Field */}
                <div className="lg:col-span-3 relative">
                  <label className="block text-gray-400 text-sm mb-2 ml-1">From</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🛫</span>
                    <input
                      type="text"
                      name="from"
                      value={formData.from}
                      onChange={handleInputChange}
                      onFocus={() => setIsFromFocused(true)}
                      onBlur={() => setTimeout(() => setIsFromFocused(false), 200)}
                      placeholder="Select departure city"
                      className="w-full bg-slate-700/50 text-white pl-12 pr-4 py-4 rounded-2xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all placeholder-gray-500"
                    />
                    
                    {/* City Suggestions Dropdown */}
                    <AnimatePresence>
                      {isFromFocused && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-slate-800 rounded-2xl border border-white/10 shadow-2xl z-50 overflow-hidden"
                        >
                          <div className="p-3">
                            <p className="text-xs text-gray-500 mb-2 px-2">Popular Cities</p>
                            {popularCities.map((city) => (
                              <motion.button
                                key={city.code}
                                type="button"
                                whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                                onClick={() => handleCitySelect('from', city)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors"
                              >
                                <span className="text-xl">{city.icon}</span>
                                <div>
                                  <p className="text-white font-medium">{city.name}</p>
                                  <p className="text-gray-500 text-xs">{city.country} • {city.code}</p>
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Swap Button */}
                <div className="lg:col-span-1 flex items-end justify-center pb-2">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={swapLocations}
                    className="w-12 h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-shadow"
                  >
                    ⇄
                  </motion.button>
                </div>

                {/* To Field */}
                <div className="lg:col-span-3 relative">
                  <label className="block text-gray-400 text-sm mb-2 ml-1">To</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🛬</span>
                    <input
                      type="text"
                      name="to"
                      value={formData.to}
                      onChange={handleInputChange}
                      onFocus={() => setIsToFocused(true)}
                      onBlur={() => setTimeout(() => setIsToFocused(false), 200)}
                      placeholder="Select arrival city"
                      className="w-full bg-slate-700/50 text-white pl-12 pr-4 py-4 rounded-2xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all placeholder-gray-500"
                    />
                    
                    {/* City Suggestions Dropdown */}
                    <AnimatePresence>
                      {isToFocused && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-slate-800 rounded-2xl border border-white/10 shadow-2xl z-50 overflow-hidden"
                        >
                          <div className="p-3">
                            <p className="text-xs text-gray-500 mb-2 px-2">Popular Cities</p>
                            {popularCities.map((city) => (
                              <motion.button
                                key={city.code}
                                type="button"
                                whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                                onClick={() => handleCitySelect('to', city)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors"
                              >
                                <span className="text-xl">{city.icon}</span>
                                <div>
                                  <p className="text-white font-medium">{city.name}</p>
                                  <p className="text-gray-500 text-xs">{city.country} • {city.code}</p>
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Departure Date */}
                <div className="lg:col-span-2">
                  <label className="block text-gray-400 text-sm mb-2 ml-1">Departure</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📅</span>
                    <input
                      type="date"
                      name="departDate"
                      value={formData.departDate}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700/50 text-white pl-12 pr-4 py-4 rounded-2xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all cursor-pointer"
                    />
                  </div>
                </div>

                {/* Return Date */}
                <AnimatePresence>
                  {tripType === 'round' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, width: 0 }}
                      animate={{ opacity: 1, scale: 1, width: 'auto' }}
                      exit={{ opacity: 0, scale: 0.8, width: 0 }}
                      className="lg:col-span-2"
                    >
                      <label className="block text-gray-400 text-sm mb-2 ml-1">Return</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">📅</span>
                        <input
                          type="date"
                          name="returnDate"
                          value={formData.returnDate}
                          onChange={handleInputChange}
                          className="w-full bg-slate-700/50 text-white pl-12 pr-4 py-4 rounded-2xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all cursor-pointer"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Passengers */}
                <div className={tripType === 'round' ? 'lg:col-span-1' : 'lg:col-span-3'}>
                  <label className="block text-gray-400 text-sm mb-2 ml-1">Passengers</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">👥</span>
                    <select
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700/50 text-white pl-12 pr-4 py-4 rounded-2xl border border-white/10 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 focus:outline-none transition-all cursor-pointer appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -15px rgba(139, 92, 246, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                className="w-full gradient-btn text-white py-4 rounded-2xl font-semibold text-lg shadow-lg shadow-violet-500/30 flex items-center justify-center gap-3"
              >
                <span>🔍</span>
                Search Flights
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </form>
          </motion.div>

          {/* Quick Info Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto"
          >
            {[
              { icon: '🔒', title: 'Secure Booking', desc: 'Your payment is protected' },
              { icon: '💰', title: 'Best Price Guarantee', desc: 'Find a lower price? We\'ll match it' },
              { icon: '🎫', title: 'Flexible Tickets', desc: 'Free cancellation on select fares' },
            ].map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center text-2xl">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{card.title}</h3>
                  <p className="text-gray-400 text-sm">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Popular Routes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              ✨ Popular Routes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { from: 'NYC', to: 'LON', price: '$299', img: '🗽→🇬🇧' },
                { from: 'LAX', to: 'TYO', price: '$499', img: '🌴→🗾' },
                { from: 'DXB', to: 'SIN', price: '$349', img: '🏙️→🇸🇬' },
                { from: 'PAR', to: 'SYD', price: '$599', img: '🗼→🇦🇺' },
              ].map((route, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-white/5 cursor-pointer group"
                >
                  <div className="text-3xl mb-2 text-center">{route.img}</div>
                  <div className="text-center">
                    <p className="text-white font-medium">{route.from} → {route.to}</p>
                    <p className="text-violet-400 font-bold text-lg group-hover:text-fuchsia-400 transition-colors">
                      from {route.price}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchFlights;
