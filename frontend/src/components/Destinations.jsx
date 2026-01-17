const Destinations = () => {
  const destinations = [
    {
      city: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80',
      price: '$308',
      route: 'Singapore (SIN) - Tokyo (HND)',
    },
    {
      city: 'Dubai, UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80',
      price: '$425',
      route: 'Singapore (SIN) - Dubai (DXB)',
    },
    {
      city: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&q=80',
      price: '$899',
      route: 'Singapore (SIN) - New York (JFK)',
    },
    {
      city: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80',
      price: '$650',
      route: 'Singapore (SIN) - Paris (CDG)',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated background orb */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-full blur-3xl animate-pulse-glow"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-violet-300 text-sm px-4 py-2 rounded-full mb-4">
            ✈ Explore Flights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Find your dream flight with comfort and
            <br />
            explore routes while enjoying seamless booking today
          </h2>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button className="gradient-btn text-white px-4 py-2 rounded-full text-sm">
            🌍 All
          </button>
          <button className="bg-slate-800 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500 hover:text-white transition-all">
            Economy
          </button>
          <button className="bg-slate-800 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500 hover:text-white transition-all">
            Business
          </button>
          <button className="bg-slate-800 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500 hover:text-white transition-all">
            ✈ Singapore (SIN)
          </button>
          <button className="bg-slate-800 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500 hover:text-white transition-all">
            ✈ Tokyo (HND)
          </button>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, index) => (
            <div key={index} className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-white/5 hover:border-violet-500/30">
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="gradient-btn text-white text-xs px-3 py-1 rounded-full">
                  ✈ One Way
                </span>
              </div>

              {/* Favorite Button */}
              <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500 transition-all">
                ♡
              </button>

              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white">{dest.city}</h3>
                  <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent font-bold">{dest.price}</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{dest.route}</p>
                <span className="inline-block bg-slate-700/50 text-gray-300 text-xs px-3 py-1 rounded-full">
                  📅 Pack
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {destinations.map((dest, index) => (
            <div key={index} className="group relative bg-slate-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div className="absolute top-4 left-4 z-10">
                <span className="gradient-btn text-white text-xs px-3 py-1 rounded-full">
                  ✈ One Way
                </span>
              </div>

              <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:gradient-btn transition-all">
                ♡
              </button>

              <div className="h-48 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white">{dest.city}</h3>
                  <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent font-bold">{dest.price}</span>
                </div>
                <p className="text-gray-400 text-sm mb-3">{dest.route}</p>
                <span className="inline-block bg-slate-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                  📅 Pack
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
