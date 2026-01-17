import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Animated counter component
const AnimatedCounter = ({ value, suffix = '', duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [isInView, controls]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.5 }}
      className="tabular-nums"
    >
      {isInView && (
        <CountUp end={value} duration={duration} suffix={suffix} />
      )}
    </motion.span>
  );
};

// Simple count up animation
const CountUp = ({ end, duration, suffix }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const current = Math.floor(progress * end);
      element.textContent = current.toLocaleString() + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = end.toLocaleString() + suffix;
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

// Section wrapper with fade-in animation
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AboutUs = () => {
  const stats = [
    { value: 15, suffix: '+', label: 'Years of Excellence', icon: '🏆' },
    { value: 200, suffix: '+', label: 'Destinations Worldwide', icon: '🌍' },
    { value: 50, suffix: 'M+', label: 'Happy Passengers', icon: '😊' },
    { value: 99, suffix: '%', label: 'On-Time Performance', icon: '⏱️' },
  ];

  const services = [
    {
      icon: '✈️',
      title: 'Premium Flights',
      description: 'Experience world-class comfort with our modern fleet and exceptional in-flight services.',
    },
    {
      icon: '🧳',
      title: 'Flexible Baggage',
      description: 'Generous baggage allowances and easy upgrades for all your travel needs.',
    },
    {
      icon: '🍽️',
      title: 'Gourmet Dining',
      description: 'Savor chef-curated meals and beverages crafted for an elevated travel experience.',
    },
    {
      icon: '💺',
      title: 'Spacious Seating',
      description: 'Enjoy extra legroom and ergonomic seats designed for ultimate comfort.',
    },
    {
      icon: '📱',
      title: 'Digital Experience',
      description: 'Seamless booking, mobile check-in, and real-time flight updates at your fingertips.',
    },
    {
      icon: '🎧',
      title: '24/7 Support',
      description: 'Our dedicated team is always ready to assist you, anytime, anywhere.',
    },
  ];

  const values = [
    {
      icon: '🛡️',
      title: 'Safety First',
      description: 'Your safety is our top priority. We maintain the highest industry standards with rigorous maintenance protocols.',
    },
    {
      icon: '💎',
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of your journey, from booking to landing.',
    },
    {
      icon: '🌱',
      title: 'Sustainability',
      description: 'Committed to reducing our carbon footprint with fuel-efficient aircraft and eco-friendly practices.',
    },
    {
      icon: '🤝',
      title: 'Integrity',
      description: 'Transparent pricing, honest communication, and keeping our promises to every passenger.',
    },
  ];

  const milestones = [
    { year: '2011', event: 'Flamingo Airlines founded with 5 aircraft' },
    { year: '2014', event: 'Expanded to 50 domestic destinations' },
    { year: '2017', event: 'Launched international routes to Europe & Asia' },
    { year: '2020', event: 'Introduced contactless travel experience' },
    { year: '2023', event: 'Fleet expanded to 150+ modern aircraft' },
    { year: '2026', event: 'Serving 200+ destinations worldwide' },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-sm mb-6"
            >
              <span>🦩</span>
              About Flamingo Airlines
            </motion.span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Your Journey,{' '}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                Our Passion
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              For over 15 years, Flamingo Airlines has been connecting people to their dreams, 
              one flight at a time. We believe travel should be more than just getting from A to B — 
              it should be an experience to remember.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 md:p-8 text-center hover:border-violet-500/30 transition-all">
                  <span className="text-3xl md:text-4xl mb-3 block">{stat.icon}</span>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/25">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                  <p className="text-gray-400 leading-relaxed">
                    To provide safe, reliable, and exceptional air travel experiences that connect 
                    people across the globe. We are committed to making every journey comfortable, 
                    affordable, and memorable while maintaining the highest standards of service excellence.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600/20 to-violet-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-500 to-violet-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-fuchsia-500/25">
                    <span className="text-2xl">🔭</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                  <p className="text-gray-400 leading-relaxed">
                    To be the world's most loved airline, recognized for our commitment to passenger 
                    comfort, operational excellence, and sustainable aviation. We envision a future 
                    where air travel brings people together while respecting our planet.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-sm mb-4">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Premium Services for Every Traveler
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From takeoff to landing, we ensure every moment of your journey is exceptional.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-violet-500/30 transition-all group"
                >
                  <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">
                    {service.icon}
                  </span>
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-sm mb-4">
              Our Core Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Drives Us Forward
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our values shape every decision we make and every service we provide.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-slate-900/60 backdrop-blur-sm border border-white/5 rounded-2xl p-6 text-center hover:border-violet-500/30 transition-all h-full">
                    <div className="w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gradient-to-br group-hover:from-violet-600 group-hover:to-fuchsia-600 transition-all">
                      <span className="text-3xl">{value.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-950/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-sm mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Milestones That Define Us
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From humble beginnings to a global airline, here's our story.
            </p>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-fuchsia-500 to-violet-500" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <AnimatedSection key={milestone.year} delay={index * 0.1}>
                  <div className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pl-12 md:pl-0`}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="inline-block bg-slate-900/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-all"
                      >
                        <span className="text-violet-400 font-bold text-lg">{milestone.year}</span>
                        <p className="text-gray-300 mt-1">{milestone.event}</p>
                      </motion.div>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transform -translate-x-1/2 shadow-lg shadow-violet-500/50" />

                    {/* Empty space for alignment */}
                    <div className="hidden md:block flex-1" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-violet-600/20 rounded-3xl blur-xl" />
              <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full text-violet-300 text-sm mb-4">
                      Why Flamingo?
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      Why Travelers Choose Us
                    </h2>
                    <p className="text-gray-400 leading-relaxed mb-8">
                      We're not just an airline — we're your travel partner. With a commitment to 
                      excellence, safety, and customer satisfaction, we've earned the trust of 
                      millions of passengers worldwide.
                    </p>
                    
                    <div className="space-y-4">
                      {[
                        { icon: '✓', text: 'Best-in-class safety records' },
                        { icon: '✓', text: 'Award-winning customer service' },
                        { icon: '✓', text: 'Competitive pricing with no hidden fees' },
                        { icon: '✓', text: 'Modern fleet with latest amenities' },
                        { icon: '✓', text: 'Flexible booking and cancellation policies' },
                      ].map((item) => (
                        <div key={item.text} className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {item.icon}
                          </span>
                          <span className="text-gray-300">{item.text}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link
                        to="/search"
                        className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-xl hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/25"
                      >
                        Book a Flight
                      </Link>
                      <Link
                        to="/contact"
                        className="px-8 py-3 bg-slate-800 border border-white/10 text-white font-semibold rounded-xl hover:bg-slate-700 transition-all"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-3xl flex items-center justify-center">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-[150px]"
                      >
                        🦩
                      </motion.div>
                    </div>
                    {/* Floating badges */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-4 -right-4 bg-slate-800 border border-white/10 rounded-2xl px-4 py-3 shadow-xl"
                    >
                      <p className="text-2xl font-bold text-white">4.9★</p>
                      <p className="text-xs text-gray-400">Customer Rating</p>
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -bottom-4 -left-4 bg-slate-800 border border-white/10 rounded-2xl px-4 py-3 shadow-xl"
                    >
                      <p className="text-2xl font-bold text-white">🏆</p>
                      <p className="text-xs text-gray-400">Award Winner</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Fly with Us?
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Join millions of satisfied travelers. Book your next adventure with Flamingo Airlines.
              </p>
              <Link
                to="/search"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-xl hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/25"
              >
                <span>Search Flights</span>
                <span>✈️</span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
