const Features = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Book & relax',
      description: 'We realize ideas from simple to complex, working with you to find the best solution.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'Smart checklist',
      description: 'Flight booking on your mind! Looking for cheap airfares & great deals? Book now!',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Save more',
      description: 'Find cheap flights, all routes great deals, so why book with Flamingo Airlines.',
    },
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Travel to make memories all around the world
            </h2>
            <button className="gradient-btn text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
              View All
            </button>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {features.map((feature, index) => (
                <div key={index} className="bg-slate-800/80 rounded-xl p-4 shadow-md text-center border border-slate-700 hover:border-violet-500/50 transition-colors">
                  <div className="w-14 h-14 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-3 text-violet-400">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-xs">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image & Minors Section */}
          <div className="space-y-6">
            {/* Airplane Engine Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=600&q=80"
                alt="Airplane Engine"
                className="rounded-2xl shadow-lg w-full h-48 object-cover"
              />
            </div>

            {/* Unaccompanied Minors Section */}
            <div className="bg-slate-800/80 rounded-2xl shadow-lg p-6 border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-4">
                Unaccompanied Minors Lounge
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-violet-400">🏢</span>
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">Help through the airport</p>
                    <p className="text-gray-400 text-xs">Dedicated staff assistance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-fuchsia-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-fuchsia-400">⚡</span>
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">Priority boarding</p>
                    <p className="text-gray-500 text-xs">First to board the plane</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-500">💺</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Care on the flight</p>
                    <p className="text-gray-500 text-xs">Attentive crew members</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-500">🎯</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Support when they land</p>
                    <p className="text-gray-500 text-xs">Safe handover guaranteed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
