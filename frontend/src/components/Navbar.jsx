import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    {
      name: 'Plan Travel',
      dropdown: [
        { name: 'Search Flights', path: '/search', icon: '🔍' },
        { name: 'Flight Schedule', path: '/schedule', icon: '🗓️' },
        { name: 'Fares & Baggage', path: '/fares', icon: '🧳' },
        { name: 'Meal Options', path: '/meal-options', icon: '🍽️' },
      ],
    },
    {
      name: 'Travel Info',
      dropdown: [
        { name: 'International Travel', path: '/international-travel', icon: '🌍' },
        { name: 'Airport Info', path: '/airports', icon: '🛫' },
        { name: 'Flight Status', path: '/flights', icon: '📍' },
        { name: 'Cancel Booking', path: '/cancel', icon: '❌' },
      ],
    },
    { name: 'Safety & Trust', path: '/safety' },
    {
      name: 'Support',
      dropdown: [
        { name: 'Help Center', path: '/help', icon: '🎧' },
        { name: 'Refund Policy', path: '/refund-policy', icon: '📜' },
        { name: 'Contact Us', path: '/contact', icon: '📞' },
      ],
    },
    { name: 'Login', path: '/login', mobileOnly: true },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-slate-900/80 backdrop-blur-md fixed w-full z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl">🦩</span>
            <div>
              <h1 className="text-xl font-bold text-white">Flamingo</h1>
              <p className="text-xs bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent font-medium -mt-1">Airlines</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center bg-slate-800/50 rounded-full px-2 py-1">
              {navItems.filter(item => !item.mobileOnly).map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.dropdown ? (
                    <button
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                        openDropdown === item.name
                          ? 'text-white'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.name}
                      <motion.span
                        animate={{ rotate: openDropdown === item.name ? 180 : 0 }}
                        className="text-xs"
                      >
                        ▼
                      </motion.span>
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? 'gradient-btn text-white'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.dropdown && openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                      >
                        <div className="p-2">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-violet-500/10 transition-colors"
                            >
                              <span className="text-lg">{subItem.icon}</span>
                              <span className="text-sm font-medium">{subItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Login/Sign Up Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 bg-white text-slate-900 px-6 py-2.5 rounded-full hover:bg-gradient-to-r hover:from-violet-400 hover:to-fuchsia-400 hover:text-white transition-all duration-300 font-medium text-sm"
            >
              <span>👤</span>
              Login / Sign Up
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 bg-slate-800/50 rounded-xl flex items-center justify-center text-white"
            >
              <motion.span
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </motion.span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 overflow-hidden"
            >
              <div className="bg-slate-800/50 rounded-2xl p-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <div>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                        >
                          <span className="font-medium">{item.name}</span>
                          <motion.span
                            animate={{ rotate: openDropdown === item.name ? 180 : 0 }}
                            className="text-xs"
                          >
                            ▼
                          </motion.span>
                        </button>
                        <AnimatePresence>
                          {openDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-1 overflow-hidden"
                            >
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.path}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-3 px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-slate-700/30 transition-colors"
                                >
                                  <span>{subItem.icon}</span>
                                  <span className="text-sm">{subItem.name}</span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                          item.mobileOnly
                            ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-center mt-2'
                            : isActive(item.path)
                            ? 'gradient-btn text-white'
                            : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                        }`}
                      >
                        {item.mobileOnly ? '👤 Login / Sign Up' : item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
