import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqs = [
  {
    category: 'Booking',
    questions: [
      {
        q: 'How do I book a flight?',
        a: 'You can book a flight through our website, mobile app, or by calling our reservation center. Simply enter your travel details, select your preferred flight, and complete the payment process.',
      },
      {
        q: 'Can I hold a booking without paying?',
        a: 'Yes, we offer a 24-hour hold option for most bookings. This allows you to secure your fare while you finalize your travel plans. A small hold fee may apply.',
      },
      {
        q: 'How do I add extra baggage to my booking?',
        a: 'You can add extra baggage during booking, through Manage Booking on our website, or at the airport. Adding baggage online is usually cheaper than at the airport.',
      },
      {
        q: 'Can I book for someone else?',
        a: 'Yes, you can book flights for other passengers. Make sure to enter the passenger details exactly as they appear on their travel documents.',
      },
    ],
  },
  {
    category: 'Check-in & Boarding',
    questions: [
      {
        q: 'When can I check in online?',
        a: 'Online check-in opens 48 hours before departure and closes 2 hours before your flight. You can check in through our website or mobile app.',
      },
      {
        q: 'What documents do I need at the airport?',
        a: 'You need a valid photo ID (passport for international travel), your booking confirmation or e-ticket, and any required visas or travel documents.',
      },
      {
        q: 'How early should I arrive at the airport?',
        a: 'For domestic flights, arrive at least 2 hours early. For international flights, arrive at least 3 hours before departure.',
      },
    ],
  },
  {
    category: 'Baggage',
    questions: [
      {
        q: 'What is the baggage allowance?',
        a: 'Baggage allowance varies by fare class. Economy: 1x23kg, Premium: 2x23kg, Business: 2x32kg, First: 3x32kg. Carry-on: 1x7kg for all classes.',
      },
      {
        q: 'What items are prohibited?',
        a: 'Prohibited items include flammable materials, explosives, sharp objects (in cabin), lithium batteries over 160Wh, and certain liquids over 100ml in carry-on.',
      },
      {
        q: 'My baggage is delayed/lost. What should I do?',
        a: 'Report to the Flamingo Airlines baggage desk immediately. File a PIR (Property Irregularity Report) and keep all receipts. We\'ll track and deliver your baggage ASAP.',
      },
    ],
  },
  {
    category: 'Payments',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit/debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and bank transfers for certain bookings.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes, we use industry-standard SSL encryption and are PCI-DSS compliant. Your payment data is never stored on our servers.',
      },
      {
        q: 'Can I pay in installments?',
        a: 'Yes, we offer installment plans through selected partners for bookings over $500. Options are displayed at checkout.',
      },
    ],
  },
];

const bookingHelp = [
  {
    icon: '🔍',
    title: 'Search & Compare',
    steps: [
      'Enter your departure and arrival cities',
      'Select your travel dates',
      'Choose number of passengers and class',
      'Click "Search Flights" to see options',
    ],
  },
  {
    icon: '✈️',
    title: 'Select Your Flight',
    steps: [
      'Compare flight times and prices',
      'Check baggage allowance for each fare',
      'Review stopover information if applicable',
      'Click "Select" on your preferred flight',
    ],
  },
  {
    icon: '👤',
    title: 'Enter Passenger Details',
    steps: [
      'Fill in passenger names as per ID',
      'Add date of birth and nationality',
      'Enter contact information',
      'Select any special requirements',
    ],
  },
  {
    icon: '💳',
    title: 'Complete Payment',
    steps: [
      'Review your booking summary',
      'Add extras like meals or baggage',
      'Select payment method',
      'Confirm and receive e-ticket via email',
    ],
  },
];

const cancellationHelp = [
  {
    scenario: 'Cancel within 24 hours of booking',
    eligibility: 'Full refund',
    process: 'Automatic through Manage Booking',
    timeline: '5-7 business days',
  },
  {
    scenario: 'Cancel 7+ days before departure',
    eligibility: 'Refund minus cancellation fee',
    process: 'Online or call center',
    timeline: '7-14 business days',
  },
  {
    scenario: 'Cancel 24h-7 days before departure',
    eligibility: 'Partial refund or travel credit',
    process: 'Online or call center',
    timeline: '14-21 business days',
  },
  {
    scenario: 'Cancel within 24 hours of departure',
    eligibility: 'Travel credit only (most fares)',
    process: 'Call center only',
    timeline: 'Credit issued within 48 hours',
  },
];

const HelpCenter = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [activeCategory, setActiveCategory] = useState('Booking');
  const [openQuestion, setOpenQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.questions.length > 0);

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-full blur-3xl animate-float"></div>
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
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              🎧
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Help <span className="gradient-text">Center</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Find answers to your questions and get the support you need
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto mb-10"
          >
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/60 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4 mb-10"
          >
            {[
              { id: 'faq', label: 'FAQs', icon: '❓' },
              { id: 'booking', label: 'Booking Help', icon: '✈️' },
              { id: 'cancellation', label: 'Cancellation Help', icon: '❌' },
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

          {/* FAQs Tab */}
          {activeTab === 'faq' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-6"
            >
              {/* Categories */}
              <div className="lg:col-span-1 space-y-2">
                <h3 className="text-white font-semibold mb-4">Categories</h3>
                {faqs.map((cat) => (
                  <motion.button
                    key={cat.category}
                    whileHover={{ x: 5 }}
                    onClick={() => setActiveCategory(cat.category)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      activeCategory === cat.category
                        ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 text-white'
                        : 'bg-slate-800/40 border border-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat.category}
                  </motion.button>
                ))}
              </div>

              {/* Questions */}
              <div className="lg:col-span-3 space-y-4">
                {(searchQuery ? filteredFaqs : faqs.filter((c) => c.category === activeCategory)).map(
                  (cat) =>
                    cat.questions.map((faq, index) => (
                      <motion.div
                        key={`${cat.category}-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-white/5 overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setOpenQuestion(openQuestion === `${cat.category}-${index}` ? null : `${cat.category}-${index}`)
                          }
                          className="w-full flex items-center justify-between p-4 text-left"
                        >
                          <span className="text-white font-medium">{faq.q}</span>
                          <motion.span
                            animate={{
                              rotate: openQuestion === `${cat.category}-${index}` ? 180 : 0,
                            }}
                            className="text-violet-400"
                          >
                            ▼
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {openQuestion === `${cat.category}-${index}` && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <p className="px-4 pb-4 text-gray-400 text-sm">{faq.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))
                )}
              </div>
            </motion.div>
          )}

          {/* Booking Help Tab */}
          {activeTab === 'booking' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {bookingHelp.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                  >
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center text-2xl mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-white font-semibold mb-3">{step.title}</h3>
                    <ul className="space-y-2">
                      {step.steps.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                          <span className="text-violet-400 mt-0.5">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-6 border border-violet-500/20 text-center"
              >
                <h3 className="text-white font-semibold mb-2">Ready to Book?</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Start searching for your perfect flight now
                </p>
                <Link to="/search">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="gradient-btn text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-violet-500/20"
                  >
                    Search Flights
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          )}

          {/* Cancellation Help Tab */}
          {activeTab === 'cancellation' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden mb-8">
                <div className="grid grid-cols-4 gap-4 p-4 bg-slate-900/50 border-b border-white/5 text-sm font-medium text-gray-400">
                  <div>Scenario</div>
                  <div>Eligibility</div>
                  <div>Process</div>
                  <div>Refund Timeline</div>
                </div>
                <div className="divide-y divide-white/5">
                  {cancellationHelp.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-violet-500/5 transition-colors"
                    >
                      <div className="text-white text-sm">{item.scenario}</div>
                      <div className="text-emerald-400 text-sm">{item.eligibility}</div>
                      <div className="text-gray-400 text-sm">{item.process}</div>
                      <div className="text-gray-500 text-sm">{item.timeline}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                >
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span>📋</span> How to Cancel Online
                  </h3>
                  <ol className="space-y-3">
                    {[
                      'Go to "Manage Booking" on our website',
                      'Enter your PNR and last name',
                      'Click "Cancel Flight" option',
                      'Review cancellation fees and refund amount',
                      'Confirm cancellation',
                      'Receive confirmation email',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                        <span className="w-6 h-6 bg-violet-500/20 rounded-full flex items-center justify-center text-violet-400 text-xs shrink-0">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                >
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span>💡</span> Good to Know
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Refunds are processed to the original payment method',
                      'Travel credits are valid for 12 months',
                      'Name changes count as cancellation + rebooking',
                      'Flex fares have lower cancellation fees',
                      'Travel insurance may cover cancellation costs',
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className="text-amber-400">⚡</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex justify-center gap-4"
              >
                <Link to="/cancel">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="gradient-btn text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-violet-500/20"
                  >
                    Cancel a Booking
                  </motion.button>
                </Link>
                <Link to="/refund-policy">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-slate-800 text-white px-6 py-3 rounded-xl font-medium border border-white/10 hover:border-violet-500/30"
                  >
                    View Refund Policy
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpCenter;
