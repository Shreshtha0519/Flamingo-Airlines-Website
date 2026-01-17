import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const visaCategories = [
  {
    region: 'North America',
    icon: '🇺🇸',
    countries: [
      { name: 'United States', visa: 'ESTA/Visa required', processing: '72 hours - 3 weeks' },
      { name: 'Canada', visa: 'eTA/Visa required', processing: '72 hours - 4 weeks' },
      { name: 'Mexico', visa: 'Visa-free for many', processing: 'N/A' },
    ],
  },
  {
    region: 'Europe',
    icon: '🇪🇺',
    countries: [
      { name: 'Schengen Area', visa: 'ETIAS (from 2025)/Visa', processing: '96 hours' },
      { name: 'United Kingdom', visa: 'ETA/Visa required', processing: '3 working days' },
      { name: 'Ireland', visa: 'Visa-free for many', processing: 'N/A' },
    ],
  },
  {
    region: 'Asia Pacific',
    icon: '🌏',
    countries: [
      { name: 'Japan', visa: 'Visa-free for many', processing: 'N/A' },
      { name: 'Australia', visa: 'ETA/eVisitor/Visa', processing: '24 hours - 4 weeks' },
      { name: 'Singapore', visa: 'Visa-free for many', processing: 'N/A' },
    ],
  },
  {
    region: 'Middle East',
    icon: '🕌',
    countries: [
      { name: 'UAE', visa: 'Visa on arrival/eVisa', processing: 'On arrival - 4 days' },
      { name: 'Qatar', visa: 'Visa-free/eVisa', processing: 'On arrival' },
      { name: 'Saudi Arabia', visa: 'eVisa required', processing: '24-48 hours' },
    ],
  },
];

const securityChecklist = [
  {
    icon: '🎒',
    title: 'Carry-on Restrictions',
    items: [
      'Liquids: Max 100ml per container in clear bag',
      'Electronics: Laptops must be removed for screening',
      'Sharp objects: Not allowed in cabin',
      'Batteries: Lithium batteries in carry-on only',
    ],
  },
  {
    icon: '🧳',
    title: 'Checked Baggage',
    items: [
      'Lock bags with TSA-approved locks',
      'Remove all prohibited items',
      'Label bags with contact information',
      'Keep valuables in carry-on',
    ],
  },
  {
    icon: '📱',
    title: 'At Security Checkpoint',
    items: [
      'Have boarding pass and ID ready',
      'Remove jacket, belt, and shoes (if required)',
      'Place electronics in separate bin',
      'Follow officer instructions',
    ],
  },
];

const travelTips = [
  { icon: '📄', title: 'Documents', tip: 'Keep copies of passport, visa, and tickets in separate locations' },
  { icon: '💊', title: 'Medications', tip: 'Carry prescriptions in original containers with documentation' },
  { icon: '💱', title: 'Currency', tip: 'Exchange some local currency before arrival' },
  { icon: '📱', title: 'Connectivity', tip: 'Download offline maps and translation apps' },
  { icon: '🏥', title: 'Insurance', tip: 'Purchase comprehensive travel insurance' },
  { icon: '🔌', title: 'Adapters', tip: 'Research plug types and bring universal adapters' },
  { icon: '💉', title: 'Vaccinations', tip: 'Check required vaccinations 6-8 weeks before travel' },
  { icon: '📞', title: 'Emergency', tip: 'Save embassy contacts and local emergency numbers' },
];

const healthRequirements = [
  { country: 'Many African countries', requirement: 'Yellow Fever vaccination required' },
  { country: 'Saudi Arabia (Hajj)', requirement: 'Meningitis vaccination required' },
  { country: 'Some Asian countries', requirement: 'Japanese Encephalitis recommended' },
  { country: 'Global requirement', requirement: 'COVID-19 vaccination may be required' },
];

const InternationalTravel = () => {
  const [activeRegion, setActiveRegion] = useState('North America');
  const [expandedSection, setExpandedSection] = useState('security');

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-full blur-3xl animate-float-delayed"></div>
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
              transition={{ duration: 4, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              🌍
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              International <span className="gradient-text">Travel Guide</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Everything you need to know for a smooth international journey
            </p>
          </motion.div>

          {/* Visa Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center">
                📋
              </span>
              Visa Requirements
            </h2>

            {/* Region Tabs */}
            <div className="flex flex-wrap gap-3 mb-6">
              {visaCategories.map((cat) => (
                <motion.button
                  key={cat.region}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveRegion(cat.region)}
                  className={`px-5 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
                    activeRegion === cat.region
                      ? 'gradient-btn text-white shadow-lg shadow-violet-500/20'
                      : 'bg-slate-800/50 text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.region}
                </motion.button>
              ))}
            </div>

            {/* Visa Table */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRegion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden"
              >
                <div className="grid grid-cols-3 gap-4 p-4 bg-slate-900/50 border-b border-white/5 text-sm font-medium text-gray-400">
                  <div>Country/Region</div>
                  <div>Visa Requirement</div>
                  <div>Processing Time</div>
                </div>
                <div className="divide-y divide-white/5">
                  {visaCategories
                    .find((cat) => cat.region === activeRegion)
                    ?.countries.map((country, index) => (
                      <motion.div
                        key={country.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="grid grid-cols-3 gap-4 p-4 items-center hover:bg-violet-500/5 transition-colors"
                      >
                        <div className="text-white font-medium">{country.name}</div>
                        <div className="text-gray-400">{country.visa}</div>
                        <div className="text-gray-500">{country.processing}</div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <p className="text-gray-500 text-sm mt-4">
              ⚠️ Visa requirements vary by nationality. Always check with the embassy or official government website.
            </p>
          </motion.div>

          {/* Security Checks Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center">
                🔒
              </span>
              Security Screening
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {securityChecklist.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center text-2xl">
                      {section.icon}
                    </div>
                    <h3 className="text-white font-semibold">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className="text-violet-400 mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Travel Tips Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center">
                💡
              </span>
              Travel Tips
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {travelTips.map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 border border-white/5 hover:border-violet-500/30 transition-all"
                >
                  <div className="text-2xl mb-2">{tip.icon}</div>
                  <h3 className="text-white font-medium mb-1">{tip.title}</h3>
                  <p className="text-gray-400 text-sm">{tip.tip}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Health Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center">
                💉
              </span>
              Health Requirements
            </h2>

            <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden">
              <div className="divide-y divide-white/5">
                {healthRequirements.map((req, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 hover:bg-violet-500/5 transition-colors"
                  >
                    <span className="text-white">{req.country}</span>
                    <span className="text-amber-400 text-sm bg-amber-500/10 px-3 py-1 rounded-full">
                      {req.requirement}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-6 border border-violet-500/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center text-2xl shrink-0">
                ℹ️
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Before You Travel</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Check entry requirements at least 6 weeks before departure</li>
                  <li>• Ensure passport is valid for at least 6 months beyond travel dates</li>
                  <li>• Register with your country's embassy abroad</li>
                  <li>• Review travel advisories for your destination</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InternationalTravel;
