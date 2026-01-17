const Travelers = () => {
  const travelers = [
    {
      name: 'William Lynn',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      destination: 'Paris',
    },
    {
      name: 'James Buck',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      destination: 'Tokyo',
    },
    {
      name: 'Lea Turner',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      destination: 'Dubai',
    },
    {
      name: 'Sebastian Jones',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      destination: 'New York',
    },
  ];

  return (
    <section className="py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
          Best travelers of the Month
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {travelers.map((traveler, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-4 mx-auto w-32 h-32">
                <img
                  src={traveler.image}
                  alt={traveler.name}
                  className="w-full h-full object-cover rounded-full border-4 border-violet-500/30 group-hover:border-violet-500 transition-colors"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 gradient-btn text-white text-xs px-3 py-1 rounded-full">
                  {traveler.destination}
                </div>
              </div>
              <h3 className="font-semibold text-white">{traveler.name}</h3>
              <p className="text-sm text-gray-400">Frequent Flyer</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Travelers;
