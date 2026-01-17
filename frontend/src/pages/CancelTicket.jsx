import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

const CancelTicket = () => {
  const [pnrInput, setPnrInput] = useState('');
  const [booking, setBooking] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');

  const handleSearch = async () => {
    if (!pnrInput.trim()) {
      setError('Please enter a PNR number');
      return;
    }

    setError('');
    setIsSearching(true);
    setBooking(null);

    try {
      const response = await api.get(`/bookings/${pnrInput.toUpperCase()}`);
      const bookingData = response.data.booking;
      
      // Transform API response to match UI format
      setBooking({
        pnr: bookingData.pnr,
        id: bookingData.id,
        status: bookingData.status?.toLowerCase() || 'confirmed',
        flight: {
          airline: 'Flamingo Airlines',
          airlineLogo: '🦩',
          flightNumber: bookingData.flight_number || 'FL-XXX',
          from: { 
            city: bookingData.source || 'Origin', 
            code: bookingData.source?.substring(0, 3).toUpperCase() || 'XXX', 
            time: bookingData.departure_time ? new Date(bookingData.departure_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '00:00'
          },
          to: { 
            city: bookingData.destination || 'Destination', 
            code: bookingData.destination?.substring(0, 3).toUpperCase() || 'XXX', 
            time: bookingData.arrival_time ? new Date(bookingData.arrival_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '00:00'
          },
          date: bookingData.departure_time ? new Date(bookingData.departure_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A',
          duration: 'N/A',
          class: 'Economy',
        },
        passengers: [{ name: bookingData.passenger_name || 'Passenger', seat: 'N/A' }],
        totalPaid: 0,
        refundAmount: 0,
      });
    } catch (err) {
      console.error('Error fetching booking:', err);
      if (err.response?.status === 404) {
        setError('No booking found with this PNR. Please check and try again.');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Unable to fetch booking. Please try again later.');
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleCancelBooking = async () => {
    setIsCancelling(true);

    try {
      await api.put(`/bookings/cancel/${booking.pnr}`);
      setIsCancelling(false);
      setIsCancelled(true);
      setShowModal(false);
    } catch (err) {
      setIsCancelling(false);
      setShowModal(false);
      console.error('Error cancelling booking:', err);
      if (err.response?.status === 401) {
        setError('Please login to cancel your booking.');
      } else if (err.response?.status === 403) {
        setError('You are not authorized to cancel this booking.');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Unable to cancel booking. Please try again later.');
      }
    }
  };

  const resetForm = () => {
    setPnrInput('');
    setBooking(null);
    setError('');
    setIsCancelled(false);
    setCancellationReason('');
  };

  const cancellationReasons = [
    'Change in travel plans',
    'Medical emergency',
    'Flight rescheduled',
    'Found better option',
    'Personal reasons',
    'Other',
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !isCancelling && setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-white/10"
            >
              {isCancelling ? (
                <div className="text-center py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full mx-auto mb-6"
                  />
                  <p className="text-white text-lg">Processing cancellation...</p>
                  <p className="text-gray-400 text-sm mt-2">Please wait</p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl">⚠️</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Cancel Booking?</h3>
                    <p className="text-gray-400 text-sm">
                      Are you sure you want to cancel this booking? This action cannot be undone.
                    </p>
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{booking?.flight.airlineLogo}</span>
                      <div>
                        <p className="text-white font-medium">{booking?.flight.flightNumber}</p>
                        <p className="text-gray-500 text-sm">
                          {booking?.flight.from.code} → {booking?.flight.to.code}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Refund Amount</span>
                      <span className="text-green-400 font-semibold">${booking?.refundAmount}</span>
                    </div>
                  </div>

                  {/* Reason Selection */}
                  <div className="mb-6">
                    <label className="block text-gray-400 text-sm mb-2">Reason for cancellation</label>
                    <select
                      value={cancellationReason}
                      onChange={(e) => setCancellationReason(e.target.value)}
                      className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-red-500 focus:outline-none"
                    >
                      <option value="">Select a reason</option>
                      {cancellationReasons.map((reason) => (
                        <option key={reason} value={reason}>{reason}</option>
                      ))}
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowModal(false)}
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-medium transition-colors"
                    >
                      Keep Booking
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCancelBooking}
                      disabled={!cancellationReason}
                      className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                        cancellationReason
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-slate-700 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Cancel Booking
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 left-10 w-80 h-80 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              🎫
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Cancel Your <span className="text-red-400">Booking</span>
            </h1>
            <p className="text-gray-400">
              Enter your PNR to retrieve and cancel your booking
            </p>
          </motion.div>

          {/* Success State */}
          <AnimatePresence mode="wait">
            {isCancelled ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-white/5 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  className="w-20 h-20 bg-green-500/20 rounded-full mx-auto mb-6 flex items-center justify-center"
                >
                  <span className="text-4xl">✓</span>
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">Booking Cancelled</h2>
                <p className="text-gray-400 mb-6">
                  Your booking <span className="text-white font-mono">{booking?.pnr}</span> has been successfully cancelled.
                </p>
                
                <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
                  <p className="text-gray-400 text-sm mb-1">Refund Amount</p>
                  <p className="text-3xl font-bold text-green-400">${booking?.refundAmount}</p>
                  <p className="text-gray-500 text-sm mt-1">Will be credited within 5-7 business days</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetForm}
                  className="gradient-btn text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-violet-500/20"
                >
                  Cancel Another Booking
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* PNR Search */}
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <span>🔍</span> Enter Booking Reference
                  </h2>
                  
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={pnrInput}
                      onChange={(e) => {
                        setPnrInput(e.target.value.toUpperCase());
                        setError('');
                      }}
                      placeholder="Enter PNR (e.g., ABC123)"
                      maxLength={6}
                      className="flex-1 bg-slate-700/50 text-white px-4 py-4 rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none placeholder-gray-500 font-mono text-lg tracking-wider uppercase"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSearch}
                      disabled={isSearching}
                      className="gradient-btn text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-violet-500/20 disabled:opacity-50"
                    >
                      {isSearching ? (
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="inline-block"
                        >
                          ⏳
                        </motion.span>
                      ) : (
                        'Search'
                      )}
                    </motion.button>
                  </div>

                  {/* Demo hint */}
                  <p className="text-gray-500 text-xs mt-3">
                    💡 Try: <span className="text-violet-400 cursor-pointer" onClick={() => setPnrInput('ABC123')}>ABC123</span> or <span className="text-violet-400 cursor-pointer" onClick={() => setPnrInput('XYZ789')}>XYZ789</span> for demo
                  </p>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3"
                      >
                        <span className="text-xl">❌</span>
                        <p className="text-red-400 text-sm">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Booking Details */}
                <AnimatePresence>
                  {booking && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden"
                    >
                      {/* Status Header */}
                      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                          <span className="text-green-400 font-medium">Active Booking</span>
                        </div>
                        <span className="text-white font-mono font-bold">{booking.pnr}</span>
                      </div>

                      <div className="p-6">
                        {/* Flight Info */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center text-4xl">
                            {booking.flight.airlineLogo}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-lg">{booking.flight.airline}</h3>
                            <p className="text-gray-400">{booking.flight.flightNumber} • {booking.flight.class}</p>
                          </div>
                        </div>

                        {/* Route */}
                        <div className="bg-slate-700/30 rounded-xl p-4 mb-6">
                          <div className="flex items-center justify-between">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-white">{booking.flight.from.time}</p>
                              <p className="text-violet-400 font-semibold">{booking.flight.from.code}</p>
                              <p className="text-gray-500 text-sm">{booking.flight.from.city}</p>
                            </div>
                            <div className="flex-1 px-6">
                              <div className="flex items-center gap-2">
                                <div className="h-px flex-1 bg-gradient-to-r from-violet-500/50 to-transparent"></div>
                                <span>✈️</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-fuchsia-500/50 to-transparent"></div>
                              </div>
                              <p className="text-center text-gray-500 text-sm mt-1">{booking.flight.duration}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-white">{booking.flight.to.time}</p>
                              <p className="text-fuchsia-400 font-semibold">{booking.flight.to.code}</p>
                              <p className="text-gray-500 text-sm">{booking.flight.to.city}</p>
                            </div>
                          </div>
                          <div className="text-center mt-4">
                            <span className="text-gray-400 text-sm">📅 {booking.flight.date}</span>
                          </div>
                        </div>

                        {/* Passengers */}
                        <div className="mb-6">
                          <p className="text-gray-400 text-sm mb-3">Passengers ({booking.passengers.length})</p>
                          <div className="space-y-2">
                            {booking.passengers.map((p, i) => (
                              <div key={i} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                  <span>👤</span>
                                  <span className="text-white">{p.name}</span>
                                </div>
                                <span className="text-gray-400 text-sm">Seat {p.seat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Pricing */}
                        <div className="border-t border-white/5 pt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Amount Paid</span>
                            <span className="text-white">${booking.totalPaid}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Cancellation Fee</span>
                            <span className="text-red-400">-${booking.totalPaid - booking.refundAmount}</span>
                          </div>
                          <div className="h-px bg-white/10 my-2"></div>
                          <div className="flex justify-between">
                            <span className="text-white font-medium">Refund Amount</span>
                            <span className="text-green-400 font-bold text-lg">${booking.refundAmount}</span>
                          </div>
                        </div>

                        {/* Cancel Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowModal(true)}
                          className="w-full mt-6 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                        >
                          <span>🗑️</span>
                          Cancel This Booking
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Cancellation Policy */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6"
                >
                  <h3 className="text-amber-400 font-semibold mb-3 flex items-center gap-2">
                    <span>📜</span> Cancellation Policy
                  </h3>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• Cancellations made 24+ hours before departure: Full refund minus $50 fee</li>
                    <li>• Cancellations made within 24 hours: 50% refund</li>
                    <li>• No-show: No refund available</li>
                    <li>• Refunds are processed within 5-7 business days</li>
                  </ul>
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

export default CancelTicket;
