import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const refundTimelines = [
  {
    timeframe: 'Within 24 hours of booking',
    domestic: '100% refund',
    international: '100% refund',
    note: 'Free cancellation for all fare types',
    highlight: true,
  },
  {
    timeframe: '24 hours - 7 days before departure',
    domestic: 'Refund minus $50 fee',
    international: 'Refund minus $100 fee',
    note: 'Flex fares: No cancellation fee',
    highlight: false,
  },
  {
    timeframe: '7 days - 72 hours before departure',
    domestic: 'Refund minus $75 fee',
    international: 'Refund minus $150 fee',
    note: 'Or travel credit of full value',
    highlight: false,
  },
  {
    timeframe: '72 hours - 24 hours before departure',
    domestic: '50% refund or travel credit',
    international: '40% refund or travel credit',
    note: 'Flex fares: 75% refund',
    highlight: false,
  },
  {
    timeframe: 'Within 24 hours of departure',
    domestic: 'Travel credit only',
    international: 'Travel credit only',
    note: 'No cash refunds available',
    highlight: false,
  },
  {
    timeframe: 'No-show',
    domestic: 'No refund',
    international: 'No refund',
    note: 'Taxes may be refundable',
    highlight: false,
  },
];

const fareTypeRefunds = [
  {
    fare: 'Economy Saver',
    icon: '🎫',
    color: 'from-gray-600/20 to-gray-700/20',
    policies: [
      { label: 'Cancellation fee', value: '$75 - $150' },
      { label: 'Change fee', value: '$50 - $100' },
      { label: 'Refund method', value: 'Travel credit only' },
      { label: 'Name change', value: 'Not permitted' },
    ],
  },
  {
    fare: 'Economy Flex',
    icon: '✨',
    color: 'from-blue-600/20 to-cyan-600/20',
    policies: [
      { label: 'Cancellation fee', value: '$25 - $50' },
      { label: 'Change fee', value: 'Free' },
      { label: 'Refund method', value: 'Original payment' },
      { label: 'Name change', value: 'One-time $50 fee' },
    ],
  },
  {
    fare: 'Business Class',
    icon: '💼',
    color: 'from-violet-600/20 to-fuchsia-600/20',
    policies: [
      { label: 'Cancellation fee', value: 'Free' },
      { label: 'Change fee', value: 'Free' },
      { label: 'Refund method', value: 'Original payment' },
      { label: 'Name change', value: 'Free (once)' },
    ],
  },
  {
    fare: 'First Class',
    icon: '👑',
    color: 'from-amber-600/20 to-orange-600/20',
    policies: [
      { label: 'Cancellation fee', value: 'Free' },
      { label: 'Change fee', value: 'Free unlimited' },
      { label: 'Refund method', value: 'Priority processing' },
      { label: 'Name change', value: 'Free (unlimited)' },
    ],
  },
];

const specialCircumstances = [
  {
    icon: '✈️',
    title: 'Flight Cancelled by Airline',
    description: 'Full refund or rebooking at no extra cost',
    details: 'If we cancel your flight, you are entitled to a full refund to your original payment method or rebooking on the next available flight at no additional charge.',
  },
  {
    icon: '⏰',
    title: 'Significant Delay (3+ hours)',
    description: 'Refund option or rebooking available',
    details: 'For delays exceeding 3 hours, you may request a full refund or choose to be rebooked on an alternative flight.',
  },
  {
    icon: '🏥',
    title: 'Medical Emergency',
    description: 'Full refund with documentation',
    details: 'Medical emergencies affecting the passenger or immediate family member (with valid documentation) qualify for full refunds without cancellation fees.',
  },
  {
    icon: '🌍',
    title: 'Travel Restrictions',
    description: 'Flexible options provided',
    details: 'Government-imposed travel bans or restrictions entitle you to a full refund or flexible rebooking options.',
  },
  {
    icon: '💀',
    title: 'Bereavement',
    description: 'Refund with documentation',
    details: 'In case of death of an immediate family member, cancellation fees are waived with submission of appropriate documentation.',
  },
  {
    icon: '⚖️',
    title: 'Denied Boarding (Oversold)',
    description: 'Compensation + full refund or rebooking',
    details: 'If denied boarding due to overbooking, you receive compensation per regulations plus choice of full refund or alternative flight.',
  },
];

const refundProcess = [
  { step: 1, title: 'Request Refund', description: 'Submit through Manage Booking or contact support', time: 'Instant' },
  { step: 2, title: 'Review', description: 'Our team reviews eligibility and calculates refund', time: '1-2 days' },
  { step: 3, title: 'Approval', description: 'Refund approved and processed', time: '2-3 days' },
  { step: 4, title: 'Payment', description: 'Funds returned to original payment method', time: '5-10 days' },
];

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-float-delayed"></div>
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
              📜
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Refund & Cancellation <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Clear, transparent policies to help you understand your options
            </p>
            <p className="text-gray-500 text-sm mt-2">Last updated: January 2026</p>
          </motion.div>

          {/* Refund Timeline Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center">
                ⏱️
              </span>
              Cancellation Timeline
            </h2>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-4 bg-slate-900/50 border-b border-white/5 text-sm font-medium text-gray-400">
                <div>Cancellation Time</div>
                <div>Domestic Flights</div>
                <div>International Flights</div>
                <div>Note</div>
              </div>
              <div className="divide-y divide-white/5">
                {refundTimelines.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`grid grid-cols-4 gap-4 p-4 items-center transition-colors ${
                      item.highlight ? 'bg-emerald-500/10' : 'hover:bg-violet-500/5'
                    }`}
                  >
                    <div className="text-white text-sm font-medium">{item.timeframe}</div>
                    <div className={`text-sm ${item.highlight ? 'text-emerald-400' : 'text-gray-300'}`}>
                      {item.domestic}
                    </div>
                    <div className={`text-sm ${item.highlight ? 'text-emerald-400' : 'text-gray-300'}`}>
                      {item.international}
                    </div>
                    <div className="text-gray-500 text-sm">{item.note}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Fare Type Policies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center">
                🎫
              </span>
              Policies by Fare Type
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fareTypeRefunds.map((fare, index) => (
                <motion.div
                  key={fare.fare}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`bg-gradient-to-br ${fare.color} backdrop-blur-sm rounded-2xl p-6 border border-white/10`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{fare.icon}</span>
                    <h3 className="text-white font-semibold">{fare.fare}</h3>
                  </div>
                  <div className="space-y-3">
                    {fare.policies.map((policy) => (
                      <div key={policy.label} className="flex justify-between text-sm">
                        <span className="text-gray-400">{policy.label}</span>
                        <span className="text-white font-medium">{policy.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Special Circumstances */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center">
                ⚡
              </span>
              Special Circumstances
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialCircumstances.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl flex items-center justify-center text-2xl mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-emerald-400 text-sm mb-3">{item.description}</p>
                  <p className="text-gray-400 text-sm">{item.details}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Refund Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center">
                🔄
              </span>
              Refund Process
            </h2>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {refundProcess.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {index < refundProcess.length - 1 && (
                      <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-violet-500/50 to-transparent"></div>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center text-white font-bold">
                        {step.step}
                      </div>
                      <div className="text-violet-400 text-sm">{step.time}</div>
                    </div>
                    <h3 className="text-white font-semibold mb-1">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Important Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
              <h3 className="text-amber-400 font-semibold mb-4 flex items-center gap-2">
                <span>⚠️</span> Important Notes
              </h3>
              <ul className="text-gray-400 text-sm space-y-2 grid grid-cols-1 md:grid-cols-2 gap-x-8">
                <li>• Refunds are processed to the original payment method only</li>
                <li>• Credit card refunds may take 1-2 billing cycles to appear</li>
                <li>• Travel credits are non-transferable and valid for 12 months</li>
                <li>• Partial use of ticket results in recalculation at full fare</li>
                <li>• Ancillary purchases (seats, meals) may have separate policies</li>
                <li>• Award ticket refunds follow different rules</li>
                <li>• Currency conversion fees are non-refundable</li>
                <li>• Third-party bookings must be refunded through the agent</li>
              </ul>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-8 border border-violet-500/20 text-center"
          >
            <h3 className="text-xl font-bold text-white mb-2">Need to Cancel or Request a Refund?</h3>
            <p className="text-gray-400 mb-6">
              Our support team is here to help you through the process
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/cancel">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="gradient-btn text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-violet-500/20"
                >
                  Cancel Booking
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-slate-800 text-white px-6 py-3 rounded-xl font-medium border border-white/10 hover:border-violet-500/30"
                >
                  Contact Support
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
