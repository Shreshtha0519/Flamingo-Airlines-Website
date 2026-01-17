import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const contactMethods = [
  {
    icon: '📧',
    title: 'Email Support',
    primary: 'support@flamingoairlines.com',
    secondary: 'Response within 24 hours',
    action: 'mailto:support@flamingoairlines.com',
  },
  {
    icon: '📞',
    title: 'Phone Support',
    primary: '+1 (800) 555-BIRD',
    secondary: 'Available 24/7',
    action: 'tel:+18005552473',
  },
  {
    icon: '🆘',
    title: 'Emergency Helpline',
    primary: '+1 (800) 911-HELP',
    secondary: '24/7 for urgent travel issues',
    action: 'tel:+18009114357',
  },
  {
    icon: '💬',
    title: 'Live Chat',
    primary: 'Chat with us',
    secondary: 'Avg. response: 2 minutes',
    action: '#',
  },
];

const offices = [
  {
    city: 'New York',
    address: '350 Fifth Avenue, Suite 4200',
    postal: 'New York, NY 10118, USA',
    phone: '+1 (212) 555-0100',
    hours: 'Mon-Fri: 9AM - 6PM EST',
    type: 'Headquarters',
  },
  {
    city: 'London',
    address: '25 Canada Square, Level 33',
    postal: 'Canary Wharf, London E14 5LQ, UK',
    phone: '+44 20 7946 0958',
    hours: 'Mon-Fri: 9AM - 6PM GMT',
    type: 'Regional Office',
  },
  {
    city: 'Singapore',
    address: '1 Raffles Place, #44-01',
    postal: 'One Raffles Place, Singapore 048616',
    phone: '+65 6438 3000',
    hours: 'Mon-Fri: 9AM - 6PM SGT',
    type: 'Regional Office',
  },
];

const socialLinks = [
  { icon: '𝕏', name: 'Twitter/X', handle: '@FlamingoAir', url: '#' },
  { icon: '📘', name: 'Facebook', handle: '/FlamingoAirlines', url: '#' },
  { icon: '📸', name: 'Instagram', handle: '@flamingoairlines', url: '#' },
  { icon: '💼', name: 'LinkedIn', handle: '/company/flamingo-airlines', url: '#' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    bookingRef: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-4"
            >
              📬
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              We're here to help. Reach out through any channel that works for you.
            </p>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.action}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5 hover:border-violet-500/30 transition-all cursor-pointer block"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-xl flex items-center justify-center text-2xl mb-4">
                  {method.icon}
                </div>
                <h3 className="text-white font-semibold mb-1">{method.title}</h3>
                <p className="text-violet-400 text-sm mb-1">{method.primary}</p>
                <p className="text-gray-500 text-xs">{method.secondary}</p>
              </motion.a>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span>✉️</span> Send us a Message
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                    ✓
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Message Sent!</h3>
                  <p className="text-gray-400">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-1 block">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-700/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-1 block">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-700/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-1 block">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-700/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-1 block">Booking Reference</label>
                      <input
                        type="text"
                        name="bookingRef"
                        value={formData.bookingRef}
                        onChange={handleChange}
                        className="w-full bg-slate-700/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50"
                        placeholder="ABC123 (if applicable)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-700/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-violet-500/50"
                    >
                      <option value="">Select a topic</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="refund">Refund Request</option>
                      <option value="complaint">Complaint</option>
                      <option value="feedback">Feedback</option>
                      <option value="baggage">Baggage Issue</option>
                      <option value="special">Special Assistance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-slate-700/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full gradient-btn text-white py-3 rounded-xl font-medium shadow-lg shadow-violet-500/20"
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Map & Offices */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Map Placeholder */}
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden">
                <div className="relative h-64 bg-slate-700/50">
                  {/* Google Maps Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🗺️</div>
                      <p className="text-gray-400">Google Maps Integration</p>
                      <p className="text-gray-500 text-sm">350 Fifth Avenue, New York</p>
                    </div>
                  </div>
                  {/* Fake map overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                </div>
              </div>

              {/* Office Addresses */}
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span>🏢</span> Our Offices
                </h2>
                <div className="space-y-4">
                  {offices.map((office, index) => (
                    <motion.div
                      key={office.city}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="bg-slate-700/30 rounded-xl p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-semibold">{office.city}</h3>
                        <span className="text-xs bg-violet-500/20 text-violet-400 px-2 py-1 rounded-full">
                          {office.type}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{office.address}</p>
                      <p className="text-gray-500 text-sm">{office.postal}</p>
                      <div className="flex justify-between items-center mt-2 text-sm">
                        <span className="text-violet-400">{office.phone}</span>
                        <span className="text-gray-500">{office.hours}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-2xl p-6 border border-violet-500/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-white font-semibold mb-1">Connect with us on Social Media</h3>
                <p className="text-gray-400 text-sm">
                  Stay updated with the latest news, deals, and travel inspiration
                </p>
              </div>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-slate-800/80 rounded-xl flex items-center justify-center text-xl hover:bg-violet-500/20 transition-colors border border-white/10"
                    title={`${social.name}: ${social.handle}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Emergency Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-red-500/10 border border-red-500/20 rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-2xl shrink-0">
                🚨
              </div>
              <div>
                <h3 className="text-red-400 font-semibold mb-1">Emergency Contact</h3>
                <p className="text-gray-400 text-sm mb-2">
                  For urgent issues within 24 hours of departure (missed flights, emergencies, immediate rebooking):
                </p>
                <p className="text-white font-medium">
                  Call: <a href="tel:+18009114357" className="text-red-400 hover:underline">+1 (800) 911-HELP</a> (24/7)
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
