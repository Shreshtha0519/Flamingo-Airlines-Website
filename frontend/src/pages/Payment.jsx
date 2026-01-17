import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const paymentMethods = [
  { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard, Amex' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️', description: 'Pay with your PayPal account' },
  { id: 'apple', name: 'Apple Pay', icon: '🍎', description: 'Quick and secure payment' },
  { id: 'google', name: 'Google Pay', icon: '🔵', description: 'Pay with Google' },
];

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, passengers, contactInfo, selections, grandTotal } = location.state || {
    flight: { airline: 'Flamingo Airlines', flightNumber: 'FL-201', from: { code: 'JFK', time: '08:00' }, to: { code: 'LHR', time: '20:15' } },
    passengers: [{ firstName: 'John', lastName: 'Doe' }],
    grandTotal: 519,
  };

  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  const handleCardChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
    } else if (field === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setCardDetails(prev => ({ ...prev, [field]: formattedValue }));
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Navigate to confirmation after success animation
    setTimeout(() => {
      const pnr = generatePNR();
      navigate('/confirmation', { 
        state: { flight, passengers, contactInfo, selections, grandTotal, pnr } 
      });
    }, 2000);
  };

  const generatePNR = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      {/* Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 border-4 border-violet-500/30 border-t-violet-500 rounded-full mx-auto mb-6"
              />
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xl text-white font-medium"
              >
                Processing your payment...
              </motion.p>
              <p className="text-gray-400 mt-2">Please don't close this window</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center"
              >
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl"
                >
                  ✓
                </motion.span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-white mb-2"
              >
                Payment Successful!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-400"
              >
                Redirecting to your ticket...
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-6 max-w-xs mx-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 left-10 w-80 h-80 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
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
              🔐
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Secure <span className="gradient-text">Payment</span>
            </h1>
            <p className="text-gray-400">Complete your booking with our secure payment gateway</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Payment Methods */}
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span>💳</span> Select Payment Method
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        selectedMethod === method.id
                          ? 'border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/20'
                          : 'border-white/5 bg-slate-800/50 hover:border-white/10'
                      }`}
                    >
                      <div className="text-3xl mb-2">{method.icon}</div>
                      <p className="text-white text-sm font-medium">{method.name}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Card Details Form */}
              <AnimatePresence mode="wait">
                {selectedMethod === 'card' && (
                  <motion.div
                    key="card-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                  >
                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                      <span>🔒</span> Card Details
                    </h2>

                    {/* Card Preview */}
                    <motion.div
                      className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-6 mb-6 relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-8">
                          <div className="w-12 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md"></div>
                          <span className="text-white/80 text-sm">Credit Card</span>
                        </div>
                        <p className="text-white text-xl tracking-widest mb-6 font-mono">
                          {cardDetails.number || '•••• •••• •••• ••••'}
                        </p>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-white/60 text-xs uppercase">Card Holder</p>
                            <p className="text-white font-medium">
                              {cardDetails.name || 'YOUR NAME'}
                            </p>
                          </div>
                          <div>
                            <p className="text-white/60 text-xs uppercase">Expires</p>
                            <p className="text-white font-medium">
                              {cardDetails.expiry || 'MM/YY'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={cardDetails.number}
                            onChange={(e) => handleCardChange('number', e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none placeholder-gray-500 font-mono"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                            <span className="text-lg opacity-50">💳</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          value={cardDetails.name}
                          onChange={(e) => handleCardChange('name', e.target.value.toUpperCase())}
                          placeholder="JOHN DOE"
                          className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none placeholder-gray-500 uppercase"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 text-sm mb-2">Expiry Date</label>
                          <input
                            type="text"
                            value={cardDetails.expiry}
                            onChange={(e) => handleCardChange('expiry', e.target.value)}
                            placeholder="MM/YY"
                            className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none placeholder-gray-500 font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-2">CVV</label>
                          <input
                            type="password"
                            value={cardDetails.cvv}
                            onChange={(e) => handleCardChange('cvv', e.target.value)}
                            placeholder="•••"
                            className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-xl border border-white/10 focus:border-violet-500 focus:outline-none placeholder-gray-500 font-mono"
                          />
                        </div>
                      </div>

                      {/* Save Card Option */}
                      <label className="flex items-center gap-3 cursor-pointer">
                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSaveCard(!saveCard)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            saveCard ? 'bg-violet-500 border-violet-500' : 'border-gray-500'
                          }`}
                        >
                          {saveCard && <span className="text-white text-xs">✓</span>}
                        </motion.div>
                        <span className="text-gray-400 text-sm">Save card for future bookings</span>
                      </label>
                    </div>
                  </motion.div>
                )}

                {selectedMethod !== 'card' && (
                  <motion.div
                    key="other-method"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border border-white/5 text-center"
                  >
                    <div className="text-6xl mb-4">
                      {paymentMethods.find(m => m.id === selectedMethod)?.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {paymentMethods.find(m => m.id === selectedMethod)?.name}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      You will be redirected to complete your payment securely
                    </p>
                    <div className="flex justify-center gap-2">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                          className="w-2 h-2 bg-violet-500 rounded-full"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Security Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-6 py-4"
              >
                {[
                  { icon: '🔒', text: 'SSL Encrypted' },
                  { icon: '🛡️', text: 'PCI Compliant' },
                  { icon: '✓', text: 'Verified by Visa' },
                  { icon: '🔐', text: 'Secure Payment' },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-400 text-sm">
                    <span>{badge.icon}</span>
                    <span>{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/5 sticky top-24 overflow-hidden">
                <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 p-6 border-b border-white/5">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span>📋</span> Order Summary
                  </h3>
                </div>

                <div className="p-6 space-y-4">
                  {/* Flight Info */}
                  <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center text-2xl">
                      🦩
                    </div>
                    <div>
                      <p className="text-white font-medium">{flight.airline}</p>
                      <p className="text-gray-500 text-sm">{flight.flightNumber}</p>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-center">
                      <p className="text-white font-semibold">{flight.from?.code}</p>
                      <p className="text-gray-500">{flight.from?.time}</p>
                    </div>
                    <div className="flex-1 px-4">
                      <div className="h-px bg-gradient-to-r from-violet-500/50 via-fuchsia-500/50 to-violet-500/50"></div>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold">{flight.to?.code}</p>
                      <p className="text-gray-500">{flight.to?.time}</p>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className="py-4 border-t border-white/5">
                    <p className="text-gray-400 text-sm mb-2">Passengers</p>
                    {passengers.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-white text-sm">
                        <span>👤</span>
                        {p.firstName} {p.lastName}
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-white/10"></div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">${grandTotal - 45}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Taxes & Fees</span>
                      <span className="text-white">$45</span>
                    </div>
                  </div>

                  <div className="h-px bg-white/10"></div>

                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-2xl font-bold text-white">${grandTotal}</span>
                  </div>

                  {/* Pay Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -15px rgba(139, 92, 246, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePayment}
                    disabled={selectedMethod === 'card' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv)}
                    className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      selectedMethod === 'card' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv)
                        ? 'bg-slate-700 text-gray-500 cursor-not-allowed'
                        : 'gradient-btn text-white shadow-lg shadow-violet-500/20'
                    }`}
                  >
                    <span>🔐</span>
                    Pay ${grandTotal}
                  </motion.button>

                  <p className="text-center text-gray-500 text-xs">
                    By clicking Pay, you agree to our Terms & Conditions
                  </p>
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

export default Payment;
