import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const safetyStandards = [
  {
    icon: '✈️',
    title: 'Aircraft Maintenance',
    description: 'Every aircraft undergoes rigorous inspections before each flight',
    details: [
      'Pre-flight safety checks on all systems',
      'Regular deep maintenance every 500 flight hours',
      'Full overhaul every 6,000 flight hours',
      'Real-time monitoring of aircraft health',
    ],
  },
  {
    icon: '🔧',
    title: 'Engineering Excellence',
    description: 'State-of-the-art maintenance facilities and certified engineers',
    details: [
      'FAA and EASA certified maintenance team',
      'Latest diagnostic equipment',
      '24/7 engineering support worldwide',
      'Partnerships with OEM manufacturers',
    ],
  },
  {
    icon: '📋',
    title: 'Regulatory Compliance',
    description: 'Meeting and exceeding international aviation standards',
    details: [
      'IATA Operational Safety Audit (IOSA) certified',
      'Regular audits by aviation authorities',
      'ISO 9001:2015 quality management',
      'SMS (Safety Management System) implemented',
    ],
  },
  {
    icon: '🛡️',
    title: 'Safety Record',
    description: '25+ years of safe operations with zero major incidents',
    details: [
      'Industry-leading safety metrics',
      'Proactive hazard identification',
      'Continuous safety improvement programs',
      'Transparent incident reporting culture',
    ],
  },
];

const crewTraining = [
  {
    role: 'Pilots',
    icon: '👨‍✈️',
    training: [
      'Minimum 1,500 flight hours experience',
      'Type-rating on specific aircraft',
      'Bi-annual simulator training',
      'CRM (Crew Resource Management)',
      'Emergency procedures recurrent training',
      'Medical fitness assessments every 6 months',
    ],
  },
  {
    role: 'Cabin Crew',
    icon: '👩‍✈️',
    training: [
      'Initial 6-week intensive training',
      'Annual recurrent safety training',
      'First aid and CPR certification',
      'Fire fighting and smoke evacuation',
      'Water survival and ditching procedures',
      'Security threat management',
    ],
  },
  {
    role: 'Ground Staff',
    icon: '🧑‍💼',
    training: [
      'Customer service excellence',
      'Dangerous goods handling certification',
      'Emergency response procedures',
      'Accessibility assistance training',
      'Security awareness programs',
      'Continuous skill development',
    ],
  },
];

const dataSecurity = [
  {
    icon: '🔐',
    title: 'Data Encryption',
    description: 'All personal and payment data is encrypted using industry-standard AES-256 encryption both in transit and at rest.',
  },
  {
    icon: '🏛️',
    title: 'Compliance',
    description: 'Fully compliant with GDPR, CCPA, and PCI-DSS standards for data protection and payment security.',
  },
  {
    icon: '🔍',
    title: 'Regular Audits',
    description: 'Third-party security audits conducted quarterly to identify and address potential vulnerabilities.',
  },
  {
    icon: '🚫',
    title: 'No Data Selling',
    description: 'We never sell your personal information to third parties. Your data is used only to improve your travel experience.',
  },
  {
    icon: '🗑️',
    title: 'Data Retention',
    description: 'Clear data retention policies with automatic deletion of unnecessary data after defined periods.',
  },
  {
    icon: '👤',
    title: 'Your Rights',
    description: 'Access, correct, or delete your personal data anytime through your account settings or by contacting us.',
  },
];

const certifications = [
  { name: 'IOSA Certified', logo: '🏅' },
  { name: 'ISO 9001:2015', logo: '📜' },
  { name: 'PCI-DSS', logo: '💳' },
  { name: 'GDPR Compliant', logo: '🇪🇺' },
];

const SafetyTrust = () => {
  const [activeTab, setActiveTab] = useState('safety');

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full blur-3xl animate-float"></div>
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
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              🛡️
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Safety & <span className="gradient-text">Trust</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Your safety is our highest priority. Learn about our commitment to keeping you secure.
            </p>
          </motion.div>

          {/* Certifications Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-full border border-white/10"
              >
                <span className="text-xl">{cert.logo}</span>
                <span className="text-white text-sm font-medium">{cert.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4 mb-10"
          >
            {[
              { id: 'safety', label: 'Safety Standards', icon: '✈️' },
              { id: 'crew', label: 'Crew Training', icon: '👨‍✈️' },
              { id: 'data', label: 'Data Security', icon: '🔐' },
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

          {/* Safety Standards Tab */}
          {activeTab === 'safety' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {safetyStandards.map((standard, index) => (
                <motion.div
                  key={standard.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl flex items-center justify-center text-3xl shrink-0">
                      {standard.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg mb-1">{standard.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{standard.description}</p>
                      <ul className="space-y-2">
                        {standard.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                            <span className="text-emerald-400">✓</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Crew Training Tab */}
          {activeTab === 'crew' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {crewTraining.map((crew, index) => (
                <motion.div
                  key={crew.role}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                >
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-3">
                      {crew.icon}
                    </div>
                    <h3 className="text-white font-semibold text-xl">{crew.role}</h3>
                  </div>
                  <ul className="space-y-3">
                    {crew.training.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className="text-violet-400 mt-0.5">●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Data Security Tab */}
          {activeTab === 'data' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {dataSecurity.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-xl flex items-center justify-center text-2xl mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Privacy Commitment */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-6 border border-blue-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl shrink-0">
                    📄
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Our Privacy Commitment</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      At Flamingo Airlines, we believe that trust is earned through transparency. We collect only the data 
                      necessary to provide you with excellent service, and we protect it with industry-leading security measures.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-blue-400 text-sm font-medium flex items-center gap-1"
                    >
                      Read Full Privacy Policy →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Trust Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-slate-800/40 rounded-2xl p-8 border border-white/5">
              <h2 className="text-2xl font-bold text-white mb-4">
                Your Trust, Our <span className="gradient-text">Commitment</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                For over 25 years, millions of passengers have trusted Flamingo Airlines to get them to their 
                destinations safely. We honor that trust every single day with unwavering commitment to safety, 
                security, and service excellence.
              </p>
              <div className="flex justify-center gap-8 text-center">
                <div>
                  <p className="text-3xl font-bold text-white">25+</p>
                  <p className="text-gray-500 text-sm">Years of Service</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">50M+</p>
                  <p className="text-gray-500 text-sm">Passengers Flown</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">99.9%</p>
                  <p className="text-gray-500 text-sm">Safety Record</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">4.8★</p>
                  <p className="text-gray-500 text-sm">Trust Rating</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SafetyTrust;
