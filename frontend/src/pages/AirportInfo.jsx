import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const airports = [
  {
    code: 'JFK',
    name: 'John F. Kennedy International',
    city: 'New York',
    country: 'USA',
    icon: '🗽',
    terminals: 6,
    flamingoTerminal: 'Terminal 4',
    lounges: ['Flamingo Premium Lounge', 'Partner Lounges'],
    features: ['Free WiFi', 'Duty Free', 'Currency Exchange', 'Pet Relief'],
  },
  {
    code: 'LHR',
    name: 'London Heathrow',
    city: 'London',
    country: 'UK',
    icon: '🇬🇧',
    terminals: 4,
    flamingoTerminal: 'Terminal 5',
    lounges: ['Flamingo Club Lounge', 'First Class Lounge'],
    features: ['Free WiFi', 'Duty Free', 'Spa Services', 'Hotel'],
  },
  {
    code: 'DXB',
    name: 'Dubai International',
    city: 'Dubai',
    country: 'UAE',
    icon: '🏙️',
    terminals: 3,
    flamingoTerminal: 'Terminal 3',
    lounges: ['Flamingo Oasis Lounge'],
    features: ['Free WiFi', 'Duty Free', 'Spa', 'Swimming Pool'],
  },
  {
    code: 'SIN',
    name: 'Singapore Changi',
    city: 'Singapore',
    country: 'Singapore',
    icon: '🇸🇬',
    terminals: 4,
    flamingoTerminal: 'Terminal 1',
    lounges: ['Flamingo Garden Lounge'],
    features: ['Free WiFi', 'Butterfly Garden', 'Movie Theater', 'Pool'],
  },
  {
    code: 'NRT',
    name: 'Narita International',
    city: 'Tokyo',
    country: 'Japan',
    icon: '🗾',
    terminals: 3,
    flamingoTerminal: 'Terminal 1',
    lounges: ['Flamingo Sakura Lounge'],
    features: ['Free WiFi', 'Duty Free', 'Capsule Hotel', 'Onsen'],
  },
  {
    code: 'CDG',
    name: 'Charles de Gaulle',
    city: 'Paris',
    country: 'France',
    icon: '🗼',
    terminals: 3,
    flamingoTerminal: 'Terminal 2E',
    lounges: ['Flamingo Paris Lounge'],
    features: ['Free WiFi', 'Art Exhibitions', 'Fine Dining', 'Spa'],
  },
];

const checkInGuidelines = [
  {
    type: 'Online Check-in',
    icon: '💻',
    timeframe: '48h - 2h before departure',
    steps: [
      'Visit flamingoairlines.com or use the app',
      'Enter booking reference and last name',
      'Select seats and add extras',
      'Download or print boarding pass',
    ],
  },
  {
    type: 'Mobile Check-in',
    icon: '📱',
    timeframe: '48h - 2h before departure',
    steps: [
      'Download Flamingo Airlines app',
      'Log in or enter booking details',
      'Complete check-in and get mobile boarding pass',
      'Add pass to Apple Wallet or Google Pay',
    ],
  },
  {
    type: 'Airport Check-in',
    icon: '🏢',
    timeframe: 'Recommended 3h before (intl), 2h (domestic)',
    steps: [
      'Locate Flamingo Airlines check-in counter',
      'Use self-service kiosk or desk service',
      'Drop bags at designated counters',
      'Proceed to security with boarding pass',
    ],
  },
];

const baggageDrop = [
  { type: 'Economy', opens: '3 hours', closes: '60 minutes' },
  { type: 'Premium Economy', opens: '3 hours', closes: '60 minutes' },
  { type: 'Business Class', opens: '3 hours', closes: '45 minutes' },
  { type: 'First Class', opens: '3 hours', closes: '45 minutes' },
];

const services = [
  { icon: '♿', name: 'Wheelchair Assistance', description: 'Request at booking or 48h before' },
  { icon: '👶', name: 'Traveling with Infants', description: 'Bassinets available on request' },
  { icon: '🐕', name: 'Pet Travel', description: 'Cabin and cargo options available' },
  { icon: '🍽️', name: 'Special Meals', description: 'Order up to 24h before departure' },
  { icon: '👥', name: 'Unaccompanied Minors', description: 'Service for children 5-14 years' },
  { icon: '🩺', name: 'Medical Assistance', description: 'Oxygen and equipment arrangements' },
];

const AirportInfo = () => {
  const [selectedAirport, setSelectedAirport] = useState(airports[0]);
  const [activeTab, setActiveTab] = useState('airports');

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              🛫
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Airport <span className="gradient-text">Information</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Find details about airports, terminals, and check-in procedures
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4 mb-10"
          >
            {[
              { id: 'airports', label: 'Our Airports', icon: '🌍' },
              { id: 'checkin', label: 'Check-in Guide', icon: '✈️' },
              { id: 'services', label: 'Services', icon: '🛎️' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'gradient-btn text-white shadow-lg shadow-violet-500/20'
                    : 'bg-slate-800/50 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Airports Tab */}
            {activeTab === 'airports' && (
              <motion.div
                key="airports"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Airport List */}
                  <div className="lg:col-span-1 space-y-3">
                    <h3 className="text-white font-semibold mb-4">Select Airport</h3>
                    {airports.map((airport) => (
                      <motion.button
                        key={airport.code}
                        whileHover={{ x: 5 }}
                        onClick={() => setSelectedAirport(airport)}
                        className={`w-full text-left p-4 rounded-xl transition-all flex items-center gap-3 ${
                          selectedAirport.code === airport.code
                            ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30'
                            : 'bg-slate-800/40 border border-white/5 hover:border-white/10'
                        }`}
                      >
                        <span className="text-2xl">{airport.icon}</span>
                        <div>
                          <p className="text-white font-medium">{airport.code}</p>
                          <p className="text-gray-400 text-sm">{airport.city}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Airport Details */}
                  <motion.div
                    key={selectedAirport.code}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-2 bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 p-6 border-b border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-4xl">
                          {selectedAirport.icon}
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">{selectedAirport.name}</h2>
                          <p className="text-gray-400">
                            {selectedAirport.city}, {selectedAirport.country} • {selectedAirport.code}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-6 space-y-6">
                      {/* Quick Info */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                          <p className="text-2xl font-bold text-white">{selectedAirport.terminals}</p>
                          <p className="text-gray-400 text-sm">Terminals</p>
                        </div>
                        <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                          <p className="text-lg font-bold text-violet-400">{selectedAirport.flamingoTerminal}</p>
                          <p className="text-gray-400 text-sm">Our Terminal</p>
                        </div>
                        <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                          <p className="text-2xl font-bold text-white">{selectedAirport.lounges.length}</p>
                          <p className="text-gray-400 text-sm">Lounges</p>
                        </div>
                        <div className="bg-slate-700/30 rounded-xl p-4 text-center">
                          <p className="text-2xl font-bold text-green-400">24/7</p>
                          <p className="text-gray-400 text-sm">Operations</p>
                        </div>
                      </div>

                      {/* Lounges */}
                      <div>
                        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <span>🛋️</span> Flamingo Lounges
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedAirport.lounges.map((lounge) => (
                            <span
                              key={lounge}
                              className="bg-violet-500/20 text-violet-400 px-4 py-2 rounded-full text-sm"
                            >
                              {lounge}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <span>✨</span> Airport Features
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {selectedAirport.features.map((feature) => (
                            <div
                              key={feature}
                              className="bg-slate-700/30 rounded-lg px-3 py-2 text-gray-300 text-sm flex items-center gap-2"
                            >
                              <span className="text-green-400">✓</span>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Check-in Tab */}
            {activeTab === 'checkin' && (
              <motion.div
                key="checkin"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Check-in Methods */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {checkInGuidelines.map((method, index) => (
                    <motion.div
                      key={method.type}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                    >
                      <div className="w-14 h-14 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center text-3xl mb-4">
                        {method.icon}
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2">{method.type}</h3>
                      <p className="text-violet-400 text-sm mb-4">{method.timeframe}</p>
                      <ol className="space-y-2">
                        {method.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                            <span className="w-5 h-5 bg-violet-500/20 rounded-full flex items-center justify-center text-violet-400 text-xs shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </motion.div>
                  ))}
                </div>

                {/* Baggage Drop Times */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                >
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span>🧳</span> Baggage Drop Times
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/5">
                          <th className="text-left text-gray-400 font-medium py-3">Travel Class</th>
                          <th className="text-left text-gray-400 font-medium py-3">Counter Opens</th>
                          <th className="text-left text-gray-400 font-medium py-3">Counter Closes</th>
                        </tr>
                      </thead>
                      <tbody>
                        {baggageDrop.map((item) => (
                          <tr key={item.type} className="border-b border-white/5">
                            <td className="py-3 text-white">{item.type}</td>
                            <td className="py-3 text-green-400">{item.opens} before</td>
                            <td className="py-3 text-amber-400">{item.closes} before</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                {/* Important Notice */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6"
                >
                  <h3 className="text-amber-400 font-semibold mb-3 flex items-center gap-2">
                    <span>⚠️</span> Important Reminders
                  </h3>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• International flights: Arrive at least 3 hours before departure</li>
                    <li>• Domestic flights: Arrive at least 2 hours before departure</li>
                    <li>• Gates close 15-20 minutes before scheduled departure</li>
                    <li>• Have valid ID and booking confirmation ready</li>
                  </ul>
                </motion.div>
              </motion.div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-violet-500/30 transition-all cursor-pointer"
                    >
                      <div className="w-14 h-14 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center text-3xl mb-4">
                        {service.icon}
                      </div>
                      <h3 className="text-white font-semibold mb-2">{service.name}</h3>
                      <p className="text-gray-400 text-sm">{service.description}</p>
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="text-violet-400 text-sm mt-4 flex items-center gap-1"
                      >
                        Learn more →
                      </motion.button>
                    </motion.div>
                  ))}
                </div>

                {/* Contact Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-6 border border-violet-500/20"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center text-2xl">
                        📞
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Need Special Assistance?</h3>
                        <p className="text-gray-400 text-sm">
                          Contact our support team 24/7 for any travel needs
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="gradient-btn text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-violet-500/20"
                    >
                      Contact Support
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AirportInfo;
