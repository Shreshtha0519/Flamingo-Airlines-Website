import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BookingDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const flight = location.state?.flight || {
    airline: 'Flamingo Airlines',
    airlineLogo: '🦩',
    flightNumber: 'FL-201',
    from: { city: 'New York', code: 'JFK', time: '08:00' },
    to: { city: 'London', code: 'LHR', time: '20:15' },
    duration: '7h 15m',
    stops: 0,
    price: 459,
    class: 'Economy',
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [passengers, setPassengers] = useState([
    { id: 1, title: 'Mr', firstName: '', lastName: '', email: '', phone: '', dob: '', passport: '' }
  ]);
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    specialRequests: ''
  });

  const steps = [
    { id: 1, name: 'Passenger Details', icon: '👤' },
    { id: 2, name: 'Contact Info', icon: '📧' },
    { id: 3, name: 'Review', icon: '✓' },
  ];

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleContactChange = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const addPassenger = () => {
    setPassengers(prev => [
      ...prev,
      { id: prev.length + 1, title: 'Mr', firstName: '', lastName: '', email: '', phone: '', dob: '', passport: '' }
    ]);
  };

  const removePassenger = (index) => {
    if (passengers.length > 1) {
      setPassengers(prev => prev.filter((_, i) => i !== index));
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleContinue = () => {
    navigate('/meals', { state: { flight, passengers, contactInfo } });
  };

  const totalPrice = flight.price * passengers.length;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 300 : -300, opacity: 0 })
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-r from-fuchsia-600/10 to-pink-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Complete Your <span className="gradient-text">Booking</span>
            </h1>
            <p className="text-gray-400">Fill in passenger details to continue</p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all ${
                      currentStep === step.id
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg shadow-violet-500/30'
                        : currentStep > step.id
                        ? 'bg-green-500/20 border border-green-500/30'
                        : 'bg-slate-800/50 border border-white/5'
                    }`}
                  >
                    <span className={`text-xl ${currentStep > step.id ? 'text-green-400' : ''}`}>
                      {currentStep > step.id ? '✓' : step.icon}
                    </span>
                    <span className={`hidden md:block font-medium ${
                      currentStep === step.id ? 'text-white' : currentStep > step.id ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {step.name}
                    </span>
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 md:w-16 h-0.5 mx-2 ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-slate-700'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2"
            >
              {/* Step 1: Passenger Details */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {passengers.map((passenger, index) => (
                    <motion.div
                      key={passenger.id}
                      variants={itemVariants}
                      className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                          <span className="w-8 h-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center text-sm">
                            {index + 1}
                          </span>
                          Passenger {index + 1}
                        </h3>
                        {passengers.length > 1 && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removePassenger(index)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Remove
                          </motion.button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Title */}
                        <div>
                          <label className="block text-gray-400 text-sm mb-2">Title</label>
                          <select
                            value={passenger.title}
                            onChange={(e) => handlePassengerChange(index, 'title', e.target.value)}
                            className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none"
                          >
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Ms">Ms</option>
                            <option value="Dr">Dr</option>
                          </select>
                        </div>

                        {/* First Name */}
                        <div>
                          <label className="block text-gray-400 text-sm mb-2">First Name</label>
                          <input
                            type="text"
                            value={passenger.firstName}
                            onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                            placeholder="As on passport"
                            className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none placeholder-gray-500"
                          />
                        </div>

                        {/* Last Name */}
                        <div>
                          <label className="block text-gray-400 text-sm mb-2">Last Name</label>
                          <input
                            type="text"
                            value={passenger.lastName}
                            onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                            placeholder="As on passport"
                            className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none placeholder-gray-500"
                          />
                        </div>

                        {/* Date of Birth */}
                        <div>
                          <label className="block text-gray-400 text-sm mb-2">Date of Birth</label>
                          <input
                            type="date"
                            value={passenger.dob}
                            onChange={(e) => handlePassengerChange(index, 'dob', e.target.value)}
                            className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none"
                          />
                        </div>

                        {/* Passport Number */}
                        <div className="md:col-span-2">
                          <label className="block text-gray-400 text-sm mb-2">Passport Number</label>
                          <input
                            type="text"
                            value={passenger.passport}
                            onChange={(e) => handlePassengerChange(index, 'passport', e.target.value)}
                            placeholder="Enter passport number"
                            className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none placeholder-gray-500"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Add Passenger Button */}
                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={addPassenger}
                    className="w-full bg-slate-800/40 hover:bg-slate-800/60 border-2 border-dashed border-white/10 hover:border-violet-500/50 rounded-2xl py-4 text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <span className="text-xl">+</span>
                    Add Another Passenger
                  </motion.button>
                </motion.div>
              )}

              {/* Step 2: Contact Info */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                >
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <span>📧</span> Contact Information
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    We'll send your booking confirmation and updates to this contact
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => handleContactChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => handleContactChange('phone', e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none placeholder-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Special Requests (Optional)</label>
                      <textarea
                        value={contactInfo.specialRequests}
                        onChange={(e) => handleContactChange('specialRequests', e.target.value)}
                        placeholder="Wheelchair assistance, special seating, etc."
                        rows={4}
                        className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none placeholder-gray-500 resize-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Passengers Review */}
                  <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <span>👥</span> Passengers ({passengers.length})
                    </h3>
                    <div className="space-y-3">
                      {passengers.map((p, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-full flex items-center justify-center">
                              👤
                            </div>
                            <div>
                              <p className="text-white font-medium">
                                {p.title} {p.firstName || 'First'} {p.lastName || 'Last'}
                              </p>
                              <p className="text-gray-500 text-sm">Passport: {p.passport || 'Not provided'}</p>
                            </div>
                          </div>
                          <span className="text-violet-400 font-semibold">${flight.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Review */}
                  <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <span>📧</span> Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Email</p>
                        <p className="text-white">{contactInfo.email || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Phone</p>
                        <p className="text-white">{contactInfo.phone || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Important Info */}
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4">
                    <div className="flex gap-3">
                      <span className="text-xl">⚠️</span>
                      <div>
                        <p className="text-amber-400 font-medium">Important</p>
                        <p className="text-gray-400 text-sm">
                          Please ensure all passenger names match exactly as they appear on travel documents.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
                    currentStep === 1
                      ? 'bg-slate-800/30 text-gray-600 cursor-not-allowed'
                      : 'bg-slate-700/50 text-white hover:bg-slate-700'
                  }`}
                >
                  ← Back
                </motion.button>

                {currentStep < 3 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={nextStep}
                    className="gradient-btn text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-violet-500/20 flex items-center gap-2"
                  >
                    Continue →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -15px rgba(139, 92, 246, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleContinue}
                    className="gradient-btn text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-violet-500/20 flex items-center gap-2"
                  >
                    Continue to Meals 🍽️
                  </motion.button>
                )}
              </motion.div>
            </motion.div>

            {/* Booking Summary Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/5 sticky top-24 overflow-hidden">
                {/* Flight Summary Header */}
                <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 p-6 border-b border-white/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-2xl">
                      {flight.airlineLogo}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{flight.airline}</h3>
                      <p className="text-gray-400 text-sm">{flight.flightNumber} • {flight.class}</p>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{flight.from.time}</p>
                      <p className="text-gray-400 text-sm">{flight.from.code}</p>
                    </div>
                    <div className="flex-1 px-4">
                      <div className="flex items-center gap-2">
                        <div className="h-px flex-1 bg-gradient-to-r from-violet-500/50 to-transparent"></div>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ✈️
                        </motion.span>
                        <div className="h-px flex-1 bg-gradient-to-l from-fuchsia-500/50 to-transparent"></div>
                      </div>
                      <p className="text-center text-gray-500 text-xs mt-1">{flight.duration}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{flight.to.time}</p>
                      <p className="text-gray-400 text-sm">{flight.to.code}</p>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-6">
                  <h4 className="text-white font-semibold mb-4">Price Details</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Base fare × {passengers.length}</span>
                      <span className="text-white">${flight.price * passengers.length}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Taxes & Fees</span>
                      <span className="text-white">$45</span>
                    </div>
                    <div className="h-px bg-white/10 my-3"></div>
                    <div className="flex justify-between">
                      <span className="text-white font-semibold">Total</span>
                      <motion.span
                        key={totalPrice}
                        initial={{ scale: 1.2, color: '#a78bfa' }}
                        animate={{ scale: 1, color: '#ffffff' }}
                        className="text-xl font-bold"
                      >
                        ${totalPrice + 45}
                      </motion.span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="mt-6">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code"
                        className="flex-1 bg-slate-700/50 text-white px-4 py-2 rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none text-sm placeholder-gray-500"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-violet-600/20 text-violet-400 rounded-xl text-sm font-medium hover:bg-violet-600/30 transition-colors"
                      >
                        Apply
                      </motion.button>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-6 space-y-2">
                    {[
                      { icon: '✓', text: 'Free cancellation within 24h' },
                      { icon: '✓', text: '23kg baggage included' },
                      { icon: '✓', text: 'Priority boarding' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <span className="text-green-400">{item.icon}</span>
                        <span className="text-gray-400">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookingDetails;
