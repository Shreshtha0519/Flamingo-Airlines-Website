const WhyChooseUs = () => {
  const features = [
    {
      number: '001',
      title: 'Affordable flight booking offers',
      description: 'Enjoy seamless travel booking with exclusive flight discounts. Comfort and savings made for you. Travel with ease and trusted airline.',
    },
    {
      number: '002',
      title: 'Worldwide routes you can explore',
      description: 'Access hundreds of destinations across the globe with our extensive network.',
    },
    {
      number: '003',
      title: 'Comfortable seats and experience',
      description: 'Premium seating options designed for your comfort on every journey.',
    },
    {
      number: '004',
      title: 'On-time departure guaranteed',
      description: 'We pride ourselves on punctuality and reliable flight schedules.',
    },
    {
      number: '005',
      title: 'Flexible payment and refunds',
      description: 'Easy payment options and hassle-free refund policies for peace of mind.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse-glow"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=700&q=80"
              alt="Airplane Wing"
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 gradient-btn rounded-2xl p-6 shadow-xl">
              <p className="text-white text-4xl font-bold">15+</p>
              <p className="text-white/80 text-sm">Years Experience</p>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span className="inline-block bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-violet-300 text-sm px-4 py-2 rounded-full mb-4">
              ★ Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Experience comfort and safety
              <br />
              in every flight you take
            </h2>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-violet-500/10 hover:to-fuchsia-500/10 border border-transparent hover:border-violet-500/20 transition-all cursor-pointer"
                >
                  <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent font-mono text-sm mt-1">{feature.number}</span>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1 group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors">
                      {feature.title}
                    </h3>
                    {index === 0 && (
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    )}
                  </div>
                  <svg className="w-5 h-5 text-gray-500 group-hover:text-fuchsia-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
