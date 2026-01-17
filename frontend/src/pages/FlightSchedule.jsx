import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const flightRoutes = [
  {
    id: 1,
    route: 'New York (JFK) → London (LHR)',
    frequency: 'Daily',
    departure: '08:00',
    arrival: '20:15',
    duration: '7h 15m',
    aircraft: 'Boeing 787',
    stops: 'Non-stop',
  },
  {
    id: 2,
    route: 'New York (JFK) → Paris (CDG)',
    frequency: 'Daily',
    departure: '10:30',
    arrival: '23:45',
    duration: '7h 15m',
    aircraft: 'Airbus A350',
    stops: 'Non-stop',
  },
  {
    id: 3,
    route: 'Los Angeles (LAX) → Tokyo (NRT)',
    frequency: '5x Weekly',
    departure: '14:00',
    arrival: '18:30+1',
    duration: '11h 30m',
    aircraft: 'Boeing 777',
    stops: 'Non-stop',
  },
  {
    id: 4,
    route: 'Miami (MIA) → Dubai (DXB)',
    frequency: '4x Weekly',
    departure: '22:00',
    arrival: '19:30+1',
    duration: '14h 30m',
    aircraft: 'Airbus A380',
    stops: 'Non-stop',
  },
  {
    id: 5,
    route: 'Chicago (ORD) → Frankfurt (FRA)',
    frequency: 'Daily',
    departure: '17:45',
    arrival: '08:00+1',
    duration: '8h 15m',
    aircraft: 'Boeing 787',
    stops: 'Non-stop',
  },
  {
    id: 6,
    route: 'San Francisco (SFO) → Singapore (SIN)',
    frequency: '3x Weekly',
    departure: '00:30',
    arrival: '08:45+1',
    duration: '17h 15m',
    aircraft: 'Airbus A350',
    stops: '1 Stop (Tokyo)',
  },
  {
    id: 7,
    route: 'Boston (BOS) → Dublin (DUB)',
    frequency: 'Daily',
    departure: '21:00',
    arrival: '08:30+1',
    duration: '6h 30m',
    aircraft: 'Boeing 757',
    stops: 'Non-stop',
  },
  {
    id: 8,
    route: 'Seattle (SEA) → Sydney (SYD)',
    frequency: '4x Weekly',
    departure: '23:30',
    arrival: '09:45+2',
    duration: '21h 15m',
    aircraft: 'Boeing 787',
    stops: '1 Stop (Auckland)',
  },
];

const FlightSchedule = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFrequency, setFilterFrequency] = useState('all');

  const filteredRoutes = flightRoutes.filter((route) => {
    const matchesSearch = route.route.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFrequency =
      filterFrequency === 'all' ||
      (filterFrequency === 'daily' && route.frequency === 'Daily') ||
      (filterFrequency === 'weekly' && route.frequency !== 'Daily');
    return matchesSearch && matchesFrequency;
  });

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-r from-fuchsia-600/10 to-pink-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              🗓️
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Flight <span className="gradient-text">Schedule</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Explore our extensive network of routes connecting major cities worldwide
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/5"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search routes (e.g., New York, London)"
                  className="w-full bg-slate-700/50 text-white pl-12 pr-4 py-3 rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none placeholder-gray-500"
                />
              </div>
              <div className="flex gap-2">
                {[
                  { value: 'all', label: 'All Flights' },
                  { value: 'daily', label: 'Daily' },
                  { value: 'weekly', label: 'Weekly' },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilterFrequency(option.value)}
                    className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                      filterFrequency === option.value
                        ? 'gradient-btn text-white'
                        : 'bg-slate-700/50 text-gray-400 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Schedule Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden"
          >
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-7 gap-4 p-4 bg-slate-900/50 border-b border-white/5 text-sm font-medium text-gray-400">
              <div className="col-span-2">Route</div>
              <div>Frequency</div>
              <div>Departure</div>
              <div>Arrival</div>
              <div>Duration</div>
              <div>Aircraft</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-white/5">
              {filteredRoutes.map((route, index) => (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(139, 92, 246, 0.05)' }}
                  className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4 items-center cursor-pointer transition-colors"
                >
                  {/* Route */}
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-lg flex items-center justify-center">
                      <span>✈️</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{route.route}</p>
                      <p className={`text-xs ${route.stops === 'Non-stop' ? 'text-green-400' : 'text-yellow-400'}`}>
                        {route.stops}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Labels */}
                  <div className="md:hidden grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Frequency</p>
                      <p className="text-white">{route.frequency}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="text-white">{route.duration}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Departure</p>
                      <p className="text-white">{route.departure}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Arrival</p>
                      <p className="text-white">{route.arrival}</p>
                    </div>
                  </div>

                  {/* Desktop Columns */}
                  <div className="hidden md:block">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      route.frequency === 'Daily'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {route.frequency}
                    </span>
                  </div>
                  <div className="hidden md:block text-white font-mono">{route.departure}</div>
                  <div className="hidden md:block text-white font-mono">{route.arrival}</div>
                  <div className="hidden md:block text-gray-400">{route.duration}</div>
                  <div className="hidden md:block text-gray-400">{route.aircraft}</div>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredRoutes.length === 0 && (
              <div className="text-center py-12">
                <span className="text-4xl mb-4 block">🔍</span>
                <p className="text-gray-400">No routes found matching your search</p>
              </div>
            )}
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          >
            {[
              { icon: '🌍', title: '50+ Destinations', desc: 'Connecting major cities worldwide' },
              { icon: '✈️', title: 'Modern Fleet', desc: 'Latest aircraft for your comfort' },
              { icon: '⏰', title: 'On-Time Performance', desc: '95% punctuality rate' },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-white/5 flex items-center gap-4"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FlightSchedule;
