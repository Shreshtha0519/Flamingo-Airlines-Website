import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const fareClasses = [
  {
    id: 'economy',
    name: 'Economy',
    icon: '💺',
    color: 'from-blue-500 to-cyan-500',
    price: 'From $199',
    features: [
      { name: 'Seat Selection', included: true, detail: 'Standard seats' },
      { name: 'Carry-on Bag', included: true, detail: '7 kg / 15 lbs' },
      { name: 'Checked Baggage', included: true, detail: '23 kg / 50 lbs' },
      { name: 'In-flight Meals', included: true, detail: 'Buy on board' },
      { name: 'Entertainment', included: true, detail: 'Personal screen' },
      { name: 'WiFi', included: false, detail: 'Available for purchase' },
      { name: 'Priority Boarding', included: false, detail: 'Not included' },
      { name: 'Lounge Access', included: false, detail: 'Not included' },
    ],
  },
  {
    id: 'premium',
    name: 'Premium Economy',
    icon: '🌟',
    color: 'from-violet-500 to-purple-500',
    price: 'From $449',
    popular: true,
    features: [
      { name: 'Seat Selection', included: true, detail: 'Extra legroom seats' },
      { name: 'Carry-on Bag', included: true, detail: '10 kg / 22 lbs' },
      { name: 'Checked Baggage', included: true, detail: '2 × 23 kg / 50 lbs' },
      { name: 'In-flight Meals', included: true, detail: 'Complimentary meals' },
      { name: 'Entertainment', included: true, detail: 'Premium content' },
      { name: 'WiFi', included: true, detail: 'Complimentary' },
      { name: 'Priority Boarding', included: true, detail: 'Zone 2' },
      { name: 'Lounge Access', included: false, detail: 'Available for purchase' },
    ],
  },
  {
    id: 'business',
    name: 'Business Class',
    icon: '💼',
    color: 'from-amber-500 to-orange-500',
    price: 'From $1,299',
    features: [
      { name: 'Seat Selection', included: true, detail: 'Lie-flat beds' },
      { name: 'Carry-on Bag', included: true, detail: '2 × 10 kg / 22 lbs' },
      { name: 'Checked Baggage', included: true, detail: '2 × 32 kg / 70 lbs' },
      { name: 'In-flight Meals', included: true, detail: 'Gourmet dining' },
      { name: 'Entertainment', included: true, detail: 'Premium + noise-canceling headphones' },
      { name: 'WiFi', included: true, detail: 'High-speed complimentary' },
      { name: 'Priority Boarding', included: true, detail: 'First to board' },
      { name: 'Lounge Access', included: true, detail: 'Premium lounges' },
    ],
  },
];

const baggageInfo = [
  {
    type: 'Carry-on',
    icon: '🎒',
    description: 'Cabin baggage',
    limits: [
      { class: 'Economy', weight: '7 kg', dimensions: '55 × 40 × 23 cm' },
      { class: 'Premium', weight: '10 kg', dimensions: '55 × 40 × 23 cm' },
      { class: 'Business', weight: '2 × 10 kg', dimensions: '55 × 40 × 23 cm' },
    ],
  },
  {
    type: 'Checked Baggage',
    icon: '🧳',
    description: 'Hold luggage',
    limits: [
      { class: 'Economy', weight: '23 kg', dimensions: '158 cm (L+W+H)' },
      { class: 'Premium', weight: '2 × 23 kg', dimensions: '158 cm (L+W+H)' },
      { class: 'Business', weight: '2 × 32 kg', dimensions: '158 cm (L+W+H)' },
    ],
  },
  {
    type: 'Extra Baggage',
    icon: '📦',
    description: 'Additional pieces',
    limits: [
      { class: 'Per piece', weight: '23 kg', dimensions: '$75 - $150' },
      { class: 'Overweight', weight: '23-32 kg', dimensions: '$100 extra' },
      { class: 'Oversized', weight: '158-203 cm', dimensions: '$150 extra' },
    ],
  },
];

const specialItems = [
  { icon: '🎸', name: 'Musical Instruments', fee: 'From $75' },
  { icon: '🏌️', name: 'Sports Equipment', fee: 'From $50' },
  { icon: '🐕', name: 'Pet in Cabin', fee: 'From $125' },
  { icon: '👶', name: 'Stroller/Car Seat', fee: 'Free' },
  { icon: '♿', name: 'Wheelchair', fee: 'Free' },
  { icon: '🎿', name: 'Ski Equipment', fee: 'From $75' },
];

const FareBaggage = () => {
  const [activeTab, setActiveTab] = useState('fares');
  const [selectedClass, setSelectedClass] = useState('premium');

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-r from-amber-600/10 to-orange-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              🧳
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Fares & <span className="gradient-text">Baggage</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Compare our travel classes and understand baggage allowances
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4 mb-10"
          >
            {[
              { id: 'fares', label: 'Fare Classes', icon: '💺' },
              { id: 'baggage', label: 'Baggage Info', icon: '🧳' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 rounded-2xl font-medium flex items-center gap-2 transition-all ${
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
            {/* Fare Classes Tab */}
            {activeTab === 'fares' && (
              <motion.div
                key="fares"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {fareClasses.map((fare, index) => (
                    <motion.div
                      key={fare.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      onClick={() => setSelectedClass(fare.id)}
                      className={`relative bg-slate-800/60 backdrop-blur-sm rounded-3xl border-2 overflow-hidden cursor-pointer transition-all ${
                        selectedClass === fare.id
                          ? 'border-violet-500 shadow-xl shadow-violet-500/20'
                          : 'border-white/5 hover:border-white/10'
                      }`}
                    >
                      {/* Popular Badge */}
                      {fare.popular && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                          Most Popular
                        </div>
                      )}

                      {/* Header */}
                      <div className={`bg-gradient-to-r ${fare.color} p-6`}>
                        <div className="text-4xl mb-2">{fare.icon}</div>
                        <h3 className="text-2xl font-bold text-white">{fare.name}</h3>
                        <p className="text-white/80 text-lg mt-1">{fare.price}</p>
                      </div>

                      {/* Features */}
                      <div className="p-6 space-y-4">
                        {fare.features.map((feature, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className={feature.included ? 'text-green-400' : 'text-gray-600'}>
                                {feature.included ? '✓' : '✕'}
                              </span>
                              <span className={feature.included ? 'text-white' : 'text-gray-500'}>
                                {feature.name}
                              </span>
                            </div>
                            <span className="text-gray-500 text-sm">{feature.detail}</span>
                          </div>
                        ))}
                      </div>

                      {/* Select Button */}
                      <div className="p-6 pt-0">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-3 rounded-xl font-semibold transition-all ${
                            selectedClass === fare.id
                              ? 'gradient-btn text-white shadow-lg'
                              : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                          }`}
                        >
                          {selectedClass === fare.id ? 'Selected' : 'Select'}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Baggage Tab */}
            {activeTab === 'baggage' && (
              <motion.div
                key="baggage"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Baggage Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {baggageInfo.map((bag, index) => (
                    <motion.div
                      key={bag.type}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center text-3xl">
                          {bag.icon}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">{bag.type}</h3>
                          <p className="text-gray-500 text-sm">{bag.description}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {bag.limits.map((limit, i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                            <span className="text-gray-400">{limit.class}</span>
                            <div className="text-right">
                              <p className="text-white font-medium">{limit.weight}</p>
                              <p className="text-gray-500 text-xs">{limit.dimensions}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Special Items */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                >
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <span>📦</span> Special Items
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {specialItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        whileHover={{ y: -5 }}
                        className="bg-slate-700/30 rounded-xl p-4 text-center"
                      >
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <p className="text-white text-sm font-medium mb-1">{item.name}</p>
                        <p className={`text-sm ${item.fee === 'Free' ? 'text-green-400' : 'text-gray-400'}`}>
                          {item.fee}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Important Notes */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6"
                >
                  <h3 className="text-blue-400 font-semibold mb-4 flex items-center gap-2">
                    <span>ℹ️</span> Important Information
                  </h3>
                  <ul className="text-gray-400 text-sm space-y-2">
                    <li>• Baggage allowances may vary by route and ticket type</li>
                    <li>• Pre-purchase additional baggage online for lower rates</li>
                    <li>• Overweight and oversized bags are subject to additional fees</li>
                    <li>• Dangerous goods and prohibited items are not allowed</li>
                    <li>• Contact us for special assistance or unusual items</li>
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

export default FareBaggage;
