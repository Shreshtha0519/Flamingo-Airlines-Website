import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TicketConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  const { flight, passengers, contactInfo, grandTotal, pnr } = location.state || {
    flight: {
      airline: 'Flamingo Airlines',
      airlineLogo: '🦩',
      flightNumber: 'FL-201',
      from: { city: 'New York', code: 'JFK', time: '08:00' },
      to: { city: 'London', code: 'LHR', time: '20:15' },
      duration: '7h 15m',
      class: 'Economy',
    },
    passengers: [{ title: 'Mr', firstName: 'John', lastName: 'Doe', passport: 'AB1234567' }],
    contactInfo: { email: 'john@example.com', phone: '+1 555-0123' },
    grandTotal: 519,
    pnr: 'ABC123',
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadTicket = () => {
    // Simulate ticket download
    alert('Ticket downloaded! (Demo)');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: -20,
                rotate: 0,
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                y: window.innerHeight + 20,
                rotate: Math.random() * 360,
                x: Math.random() * window.innerWidth,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
              className={`absolute w-3 h-3 ${
                ['bg-violet-500', 'bg-fuchsia-500', 'bg-pink-500', 'bg-amber-500', 'bg-green-500'][
                  Math.floor(Math.random() * 5)
                ]
              }`}
              style={{
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
              }}
            />
          ))}
        </div>
      )}

      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-green-500/30"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-5xl"
              >
                ✓
              </motion.span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-white mb-2"
            >
              Booking <span className="gradient-text">Confirmed!</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400"
            >
              Your flight has been successfully booked. Check your email for confirmation.
            </motion.p>
          </motion.div>

          {/* PNR Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-6 mb-8 border border-violet-500/20 text-center"
          >
            <p className="text-gray-400 text-sm mb-2">Your Booking Reference (PNR)</p>
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-5xl font-bold text-white tracking-widest font-mono"
            >
              {pnr}
            </motion.p>
            <p className="text-gray-500 text-sm mt-2">Save this number for check-in and support queries</p>
          </motion.div>

          {/* Ticket Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-slate-800/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/5 shadow-2xl"
          >
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl">
                    {flight.airlineLogo}
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-xl">{flight.airline}</h2>
                    <p className="text-white/80 text-sm">{flight.flightNumber} • {flight.class}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs uppercase">Boarding Pass</p>
                  <p className="text-white font-bold">E-Ticket</p>
                </div>
              </div>
            </div>

            {/* Flight Details */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                {/* Departure */}
                <div className="text-center">
                  <p className="text-4xl font-bold text-white">{flight.from.time}</p>
                  <p className="text-2xl font-semibold text-violet-400">{flight.from.code}</p>
                  <p className="text-gray-400 text-sm">{flight.from.city}</p>
                </div>

                {/* Flight Path */}
                <div className="flex-1 px-8">
                  <div className="relative">
                    <div className="h-px bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500"></div>
                    <motion.div
                      animate={{ x: [0, 100, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                    >
                      <span className="text-2xl">✈️</span>
                    </motion.div>
                  </div>
                  <p className="text-center text-gray-500 text-sm mt-2">{flight.duration}</p>
                </div>

                {/* Arrival */}
                <div className="text-center">
                  <p className="text-4xl font-bold text-white">{flight.to.time}</p>
                  <p className="text-2xl font-semibold text-fuchsia-400">{flight.to.code}</p>
                  <p className="text-gray-400 text-sm">{flight.to.city}</p>
                </div>
              </div>

              {/* Dotted Line Separator */}
              <div className="relative py-4">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-900 rounded-full -translate-x-1/2"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-900 rounded-full translate-x-1/2"></div>
                <div className="border-t-2 border-dashed border-white/10"></div>
              </div>

              {/* Passenger Details */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <span>👥</span> Passenger Details
                </h3>
                {passengers.map((passenger, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="bg-slate-700/30 rounded-xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    <div>
                      <p className="text-gray-500 text-xs uppercase">Passenger Name</p>
                      <p className="text-white font-medium">
                        {passenger.title} {passenger.firstName} {passenger.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase">Passport</p>
                      <p className="text-white font-medium font-mono">{passenger.passport || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase">Seat</p>
                      <p className="text-white font-medium">{String.fromCharCode(65 + index)}{Math.floor(Math.random() * 30) + 1}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase">Baggage</p>
                      <p className="text-white font-medium">23 kg</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Barcode */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 flex justify-center"
              >
                <div className="bg-white p-4 rounded-xl">
                  <div className="flex gap-0.5">
                    {[...Array(40)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-black"
                        style={{
                          width: Math.random() > 0.5 ? '2px' : '3px',
                          height: '50px',
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-center text-black text-xs mt-2 font-mono">{pnr}</p>
                </div>
              </motion.div>
            </div>

            {/* Ticket Footer */}
            <div className="bg-slate-900/50 p-6 border-t border-white/5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="text-white font-medium">Jan 25, 2026</p>
                </div>
                <div>
                  <p className="text-gray-500">Gate</p>
                  <p className="text-white font-medium">A{Math.floor(Math.random() * 20) + 1}</p>
                </div>
                <div>
                  <p className="text-gray-500">Boarding</p>
                  <p className="text-white font-medium">07:30</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Paid</p>
                  <p className="text-green-400 font-bold">${grandTotal}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadTicket}
              className="gradient-btn text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-violet-500/20 flex items-center gap-2"
            >
              <span>📥</span> Download Ticket
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              className="bg-slate-700/50 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors"
            >
              <span>🖨️</span> Print
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="bg-slate-700/50 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors"
            >
              <span>🏠</span> Back to Home
            </motion.button>
          </motion.div>

          {/* Important Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6"
          >
            <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
              <span>ℹ️</span> Important Information
            </h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Please arrive at the airport at least 3 hours before departure for international flights</li>
              <li>• Carry a valid government-issued photo ID and your passport</li>
              <li>• Web check-in opens 48 hours before departure</li>
              <li>• For any changes or cancellations, visit our Help Center or use PNR: <span className="text-white font-mono">{pnr}</span></li>
            </ul>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TicketConfirmation;
