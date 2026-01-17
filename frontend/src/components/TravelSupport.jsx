const TravelSupport = () => {
  const travelInfo = [
    {
      id: '01',
      title: 'Travel requirements for Dubai',
      description: 'Flamingo Airlines is by far one of the best travel websites for sourcing travel deals.',
    },
    {
      id: '02',
      title: 'Multi-risk travel insurance',
      description: 'Get comprehensive coverage for your journey with our partner insurance providers.',
    },
    {
      id: '03',
      title: 'Travel requirements by destination',
      description: 'Check visa requirements, health protocols, and entry guidelines for your destination.',
    },
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent tracking-widest text-sm mb-2">TRAVEL SUPPORT</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Plan your travel with confidence
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find help with your bookings and travel plans, and see what to expect along your journey.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Travel Info List */}
          <div className="space-y-6">
            {travelInfo.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 gradient-btn rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{item.id}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80"
              alt="Dubai Skyline"
              className="rounded-2xl shadow-lg w-full h-80 object-cover"
            />
            <div className="absolute -bottom-4 -left-4 bg-slate-800 rounded-xl shadow-lg p-4 max-w-xs border border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gradient-btn rounded-full flex items-center justify-center">
                  <span className="text-2xl">✈️</span>
                </div>
                <div>
                  <p className="font-semibold text-white">500+ Destinations</p>
                  <p className="text-sm text-gray-400">Worldwide coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelSupport;
