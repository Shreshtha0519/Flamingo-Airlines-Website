import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const mealOptions = [
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    description: 'Fresh garden vegetables with quinoa, grilled paneer, and aromatic herbs',
    icon: '🥗',
    image: '🥬🍅🥕',
    price: 15,
    tags: ['Healthy', 'Fresh'],
    calories: '450 kcal',
  },
  {
    id: 'non-vegetarian',
    name: 'Non-Vegetarian',
    description: 'Tender grilled chicken breast with seasonal vegetables and herb butter sauce',
    icon: '🍗',
    image: '🍖🥩🍗',
    price: 20,
    tags: ['Protein', 'Popular'],
    calories: '580 kcal',
  },
  {
    id: 'vegan',
    name: 'Vegan',
    description: 'Plant-based Buddha bowl with chickpeas, avocado, and tahini dressing',
    icon: '🌱',
    image: '🥑🌿🥜',
    price: 18,
    tags: ['Plant-based', 'Organic'],
    calories: '420 kcal',
  },
  {
    id: 'seafood',
    name: 'Seafood',
    description: 'Pan-seared salmon fillet with lemon butter, asparagus, and wild rice',
    icon: '🐟',
    image: '🦐🐟🦞',
    price: 25,
    tags: ['Premium', 'Omega-3'],
    calories: '520 kcal',
  },
  {
    id: 'kids',
    name: 'Kids Meal',
    description: 'Fun-sized chicken nuggets with fries, fruit cup, and a chocolate cookie',
    icon: '🧒',
    image: '🍟🍪🧃',
    price: 12,
    tags: ['Kid-friendly'],
    calories: '380 kcal',
  },
  {
    id: 'none',
    name: 'No Meal',
    description: 'Skip the in-flight meal service',
    icon: '❌',
    image: '—',
    price: 0,
    tags: ['Save'],
    calories: '—',
  },
];

const beverageOptions = [
  { id: 'none', name: 'Standard (Included)', icon: '☕', price: 0 },
  { id: 'premium', name: 'Premium Beverages', icon: '🍷', price: 8 },
  { id: 'champagne', name: 'Champagne', icon: '🥂', price: 15 },
];

const MealSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { flight, passengers, contactInfo } = location.state || {
    flight: { price: 459 },
    passengers: [{ id: 1, firstName: 'John', lastName: 'Doe' }],
    contactInfo: {},
  };

  const [selections, setSelections] = useState(
    passengers.map((p) => ({
      passengerId: p.id,
      passengerName: `${p.firstName || 'Passenger'} ${p.lastName || p.id}`,
      meal: null,
      beverage: 'none',
    }))
  );
  const [activePassenger, setActivePassenger] = useState(0);

  const handleMealSelect = (mealId) => {
    setSelections((prev) =>
      prev.map((s, i) =>
        i === activePassenger ? { ...s, meal: mealId } : s
      )
    );
  };

  const handleBeverageSelect = (beverageId) => {
    setSelections((prev) =>
      prev.map((s, i) =>
        i === activePassenger ? { ...s, beverage: beverageId } : s
      )
    );
  };

  const calculateMealTotal = () => {
    return selections.reduce((total, s) => {
      const meal = mealOptions.find((m) => m.id === s.meal);
      const beverage = beverageOptions.find((b) => b.id === s.beverage);
      return total + (meal?.price || 0) + (beverage?.price || 0);
    }, 0);
  };

  const baseTotal = flight.price * passengers.length + 45;
  const mealTotal = calculateMealTotal();
  const grandTotal = baseTotal + mealTotal;

  const handleContinue = () => {
    navigate('/payment', { state: { flight, passengers, contactInfo, selections, grandTotal } });
  };

  const currentSelection = selections[activePassenger];

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-orange-600/20 to-amber-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 right-10 w-80 h-80 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              🍽️
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Select Your <span className="gradient-text">In-Flight Meals</span>
            </h1>
            <p className="text-gray-400">
              Customize your dining experience at 35,000 feet
            </p>
          </motion.div>

          {/* Passenger Tabs */}
          {passengers.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              {selections.map((s, index) => (
                <motion.button
                  key={s.passengerId}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActivePassenger(index)}
                  className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                    activePassenger === index
                      ? 'gradient-btn text-white shadow-lg shadow-violet-500/20'
                      : 'bg-slate-800/50 text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  <span>👤</span>
                  {s.passengerName}
                  {s.meal && <span className="text-green-400">✓</span>}
                </motion.button>
              ))}
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Meal Options */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <span>🍴</span> Main Course
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence mode="wait">
                    {mealOptions.map((meal, index) => (
                      <motion.div
                        key={meal.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleMealSelect(meal.id)}
                        className={`relative bg-slate-800/60 backdrop-blur-sm rounded-2xl p-5 border-2 cursor-pointer transition-all overflow-hidden ${
                          currentSelection.meal === meal.id
                            ? 'border-violet-500 shadow-lg shadow-violet-500/20'
                            : 'border-white/5 hover:border-white/10'
                        }`}
                      >
                        {/* Selection Indicator */}
                        <AnimatePresence>
                          {currentSelection.meal === meal.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center"
                            >
                              <span className="text-white text-xs">✓</span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Popular Badge */}
                        {meal.tags.includes('Popular') && (
                          <div className="absolute top-3 left-3 bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded-full">
                            🔥 Popular
                          </div>
                        )}

                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center text-3xl shrink-0">
                            {meal.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-white font-semibold">{meal.name}</h3>
                              <motion.span
                                key={meal.price}
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                className={`font-bold ${meal.price === 0 ? 'text-green-400' : 'text-violet-400'}`}
                              >
                                {meal.price === 0 ? 'Free' : `+$${meal.price}`}
                              </motion.span>
                            </div>
                            <p className="text-gray-400 text-sm mb-2 line-clamp-2">{meal.description}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">{meal.calories}</span>
                              {meal.tags.filter(t => t !== 'Popular').map((tag) => (
                                <span key={tag} className="text-xs bg-slate-700/50 text-gray-400 px-2 py-0.5 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Beverage Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <span>🥤</span> Beverage Package
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {beverageOptions.map((beverage) => (
                    <motion.div
                      key={beverage.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleBeverageSelect(beverage.id)}
                      className={`bg-slate-800/60 backdrop-blur-sm rounded-2xl p-4 border-2 cursor-pointer transition-all text-center ${
                        currentSelection.beverage === beverage.id
                          ? 'border-violet-500 shadow-lg shadow-violet-500/20'
                          : 'border-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className="text-3xl mb-2">{beverage.icon}</div>
                      <h3 className="text-white font-medium mb-1">{beverage.name}</h3>
                      <span className={`text-sm font-semibold ${beverage.price === 0 ? 'text-green-400' : 'text-violet-400'}`}>
                        {beverage.price === 0 ? 'Included' : `+$${beverage.price}`}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Special Dietary Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4"
              >
                <div className="flex gap-3">
                  <span className="text-xl">ℹ️</span>
                  <div>
                    <p className="text-blue-400 font-medium">Dietary Requirements?</p>
                    <p className="text-gray-400 text-sm">
                      For allergies or special dietary needs, please contact our support team at least 48 hours before departure.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Order Summary Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/5 sticky top-24 overflow-hidden">
                <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 p-6 border-b border-white/5">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span>📋</span> Order Summary
                  </h3>
                </div>

                <div className="p-6 space-y-4">
                  {/* Passenger Selections */}
                  {selections.map((s, index) => {
                    const meal = mealOptions.find((m) => m.id === s.meal);
                    const beverage = beverageOptions.find((b) => b.id === s.beverage);
                    const passengerTotal = (meal?.price || 0) + (beverage?.price || 0);

                    return (
                      <motion.div
                        key={s.passengerId}
                        layout
                        className={`p-3 rounded-xl transition-all ${
                          activePassenger === index ? 'bg-slate-700/50' : 'bg-slate-800/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium text-sm">{s.passengerName}</span>
                          <motion.span
                            key={passengerTotal}
                            initial={{ scale: 1.2, color: '#a78bfa' }}
                            animate={{ scale: 1, color: '#9ca3af' }}
                            className="text-sm"
                          >
                            +${passengerTotal}
                          </motion.span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {meal ? (
                            <span className="flex items-center gap-1">
                              {meal.icon} {meal.name}
                            </span>
                          ) : (
                            <span className="text-amber-400">⚠ No meal selected</span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}

                  <div className="h-px bg-white/10"></div>

                  {/* Price Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Flight Total</span>
                      <span className="text-white">${baseTotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Meals & Beverages</span>
                      <motion.span
                        key={mealTotal}
                        initial={{ scale: 1.2, color: '#a78bfa' }}
                        animate={{ scale: 1, color: '#ffffff' }}
                        className="text-white"
                      >
                        ${mealTotal}
                      </motion.span>
                    </div>
                  </div>

                  <div className="h-px bg-white/10"></div>

                  {/* Grand Total */}
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Grand Total</span>
                    <motion.span
                      key={grandTotal}
                      initial={{ scale: 1.3, color: '#a78bfa' }}
                      animate={{ scale: 1, color: '#ffffff' }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="text-2xl font-bold"
                    >
                      ${grandTotal}
                    </motion.span>
                  </div>

                  {/* Continue Button */}
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -15px rgba(139, 92, 246, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleContinue}
                    disabled={selections.some((s) => !s.meal)}
                    className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      selections.some((s) => !s.meal)
                        ? 'bg-slate-700 text-gray-500 cursor-not-allowed'
                        : 'gradient-btn text-white shadow-lg shadow-violet-500/20'
                    }`}
                  >
                    Continue to Payment
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.button>

                  {selections.some((s) => !s.meal) && (
                    <p className="text-center text-amber-400 text-xs">
                      Please select a meal for all passengers
                    </p>
                  )}
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

export default MealSelection;
