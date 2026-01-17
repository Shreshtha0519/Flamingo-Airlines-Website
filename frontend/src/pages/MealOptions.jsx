import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const mealCategories = [
  {
    id: 'standard',
    name: 'Standard Meals',
    description: 'Complimentary on select flights',
    meals: [
      {
        name: 'Chicken with Rice',
        icon: '🍗',
        description: 'Grilled chicken breast with herb rice and steamed vegetables',
        price: 'Included',
        calories: '520 kcal',
        tags: ['Popular'],
      },
      {
        name: 'Pasta Primavera',
        icon: '🍝',
        description: 'Penne pasta with seasonal vegetables in tomato basil sauce',
        price: 'Included',
        calories: '480 kcal',
        tags: ['Vegetarian'],
      },
      {
        name: 'Fish & Chips',
        icon: '🐟',
        description: 'Battered cod fillet with crispy fries and tartar sauce',
        price: 'Included',
        calories: '590 kcal',
        tags: [],
      },
    ],
  },
  {
    id: 'premium',
    name: 'Premium Meals',
    description: 'Enhanced dining experience',
    meals: [
      {
        name: 'Grilled Salmon',
        icon: '🍣',
        description: 'Atlantic salmon with lemon butter, asparagus and quinoa',
        price: '$18',
        calories: '480 kcal',
        tags: ['Chef\'s Choice', 'Omega-3'],
      },
      {
        name: 'Beef Tenderloin',
        icon: '🥩',
        description: 'Premium beef with red wine reduction, mashed potatoes',
        price: '$22',
        calories: '620 kcal',
        tags: ['Premium'],
      },
      {
        name: 'Lamb Shank',
        icon: '🍖',
        description: 'Slow-cooked lamb with rosemary and roasted vegetables',
        price: '$24',
        calories: '580 kcal',
        tags: ['Signature'],
      },
    ],
  },
  {
    id: 'special',
    name: 'Special Dietary',
    description: 'For specific dietary needs',
    meals: [
      {
        name: 'Vegan Buddha Bowl',
        icon: '🥗',
        description: 'Chickpeas, quinoa, avocado, and tahini dressing',
        price: '$15',
        calories: '420 kcal',
        tags: ['Vegan', 'Gluten-Free'],
      },
      {
        name: 'Keto Plate',
        icon: '🥑',
        description: 'Grilled chicken, avocado, cheese, and low-carb vegetables',
        price: '$16',
        calories: '380 kcal',
        tags: ['Keto', 'Low-Carb'],
      },
      {
        name: 'Halal Chicken',
        icon: '🍗',
        description: 'Halal-certified chicken with aromatic rice and vegetables',
        price: '$14',
        calories: '490 kcal',
        tags: ['Halal'],
      },
      {
        name: 'Kosher Meal',
        icon: '✡️',
        description: 'Kosher-certified meal prepared according to Jewish dietary laws',
        price: '$14',
        calories: '460 kcal',
        tags: ['Kosher'],
      },
    ],
  },
  {
    id: 'kids',
    name: 'Kids Menu',
    description: 'Fun meals for young travelers',
    meals: [
      {
        name: 'Chicken Nuggets',
        icon: '🍟',
        description: 'Crispy nuggets with fries, fruit cup, and chocolate cookie',
        price: '$10',
        calories: '450 kcal',
        tags: ['Kid Favorite'],
      },
      {
        name: 'Mac & Cheese',
        icon: '🧀',
        description: 'Creamy macaroni and cheese with vegetable sticks',
        price: '$9',
        calories: '420 kcal',
        tags: ['Vegetarian'],
      },
      {
        name: 'Mini Pizza',
        icon: '🍕',
        description: 'Personal pizza with cheese and choice of toppings',
        price: '$11',
        calories: '480 kcal',
        tags: ['Popular'],
      },
    ],
  },
];

const beverages = [
  { name: 'Soft Drinks', icon: '🥤', price: 'Included' },
  { name: 'Coffee & Tea', icon: '☕', price: 'Included' },
  { name: 'Fresh Juice', icon: '🧃', price: '$4' },
  { name: 'Beer', icon: '🍺', price: '$8' },
  { name: 'Wine', icon: '🍷', price: '$10' },
  { name: 'Champagne', icon: '🥂', price: '$15' },
];

const MealOptions = () => {
  const [activeCategory, setActiveCategory] = useState('standard');
  const [selectedMeals, setSelectedMeals] = useState([]);

  const toggleMealSelection = (mealName) => {
    setSelectedMeals((prev) =>
      prev.includes(mealName)
        ? prev.filter((m) => m !== mealName)
        : [...prev, mealName]
    );
  };

  const activeMenuItems = mealCategories.find((cat) => cat.id === activeCategory)?.meals || [];

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
            className="text-center mb-12"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              🍽️
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              In-Flight <span className="gradient-text">Dining</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Discover our curated menu options for an elevated dining experience at 35,000 feet
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {mealCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeCategory === category.id
                    ? 'gradient-btn text-white shadow-lg shadow-violet-500/20'
                    : 'bg-slate-800/50 text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Category Description */}
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 mb-8"
          >
            {mealCategories.find((cat) => cat.id === activeCategory)?.description}
          </motion.p>

          {/* Meal Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {activeMenuItems.map((meal, index) => (
                <motion.div
                  key={meal.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => toggleMealSelection(meal.name)}
                  className={`bg-slate-800/60 backdrop-blur-sm rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                    selectedMeals.includes(meal.name)
                      ? 'border-violet-500 shadow-xl shadow-violet-500/20'
                      : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  {/* Selection Indicator */}
                  <AnimatePresence>
                    {selectedMeals.includes(meal.name) && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center z-10"
                      >
                        <span className="text-white text-sm">✓</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Meal Image Placeholder */}
                  <div className="h-32 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative">
                    <motion.span
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl"
                    >
                      {meal.icon}
                    </motion.span>
                    {/* Tags */}
                    {meal.tags.length > 0 && (
                      <div className="absolute top-3 left-3 flex gap-2">
                        {meal.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              tag === 'Popular' || tag === 'Chef\'s Choice'
                                ? 'bg-amber-500/20 text-amber-400'
                                : tag === 'Vegetarian' || tag === 'Vegan'
                                ? 'bg-green-500/20 text-green-400'
                                : tag === 'Premium' || tag === 'Signature'
                                ? 'bg-violet-500/20 text-violet-400'
                                : 'bg-blue-500/20 text-blue-400'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-semibold text-lg">{meal.name}</h3>
                      <span
                        className={`font-bold ${
                          meal.price === 'Included' ? 'text-green-400' : 'text-violet-400'
                        }`}
                      >
                        {meal.price}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{meal.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">{meal.calories}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all ${
                          selectedMeals.includes(meal.name)
                            ? 'bg-violet-500 text-white'
                            : 'bg-slate-700/50 text-gray-400 hover:text-white'
                        }`}
                      >
                        {selectedMeals.includes(meal.name) ? 'Selected' : 'Select'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Beverages Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5 mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <span>🥤</span> Beverages
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {beverages.map((beverage, index) => (
                <motion.div
                  key={beverage.name}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-slate-700/30 rounded-xl p-4 text-center cursor-pointer hover:bg-slate-700/50 transition-colors"
                >
                  <div className="text-3xl mb-2">{beverage.icon}</div>
                  <p className="text-white text-sm font-medium mb-1">{beverage.name}</p>
                  <p className={`text-sm ${beverage.price === 'Included' ? 'text-green-400' : 'text-gray-400'}`}>
                    {beverage.price}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pre-order Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* How to Pre-order */}
            <div className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-6 border border-violet-500/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span>📱</span> Pre-order Your Meal
              </h3>
              <ul className="text-gray-400 text-sm space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-violet-500/30 rounded-full flex items-center justify-center text-xs text-violet-400">1</span>
                  Select your preferred meals during booking
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-violet-500/30 rounded-full flex items-center justify-center text-xs text-violet-400">2</span>
                  Or pre-order up to 24 hours before departure
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-violet-500/30 rounded-full flex items-center justify-center text-xs text-violet-400">3</span>
                  Enjoy priority meal service on board
                </li>
              </ul>
            </div>

            {/* Dietary Notes */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
              <h3 className="text-amber-400 font-semibold mb-4 flex items-center gap-2">
                <span>⚠️</span> Dietary Information
              </h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Special meals must be requested at least 48 hours in advance</li>
                <li>• Please inform us of any allergies during booking</li>
                <li>• Meal availability may vary by route and flight duration</li>
                <li>• All meals contain allergen information on packaging</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MealOptions;
