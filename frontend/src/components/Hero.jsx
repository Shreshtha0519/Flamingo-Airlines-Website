import { useState } from 'react';

const Hero = () => {
  const [tripType, setTripType] = useState('oneway');

  return (
    <section className="relative min-h-screen pt-24 pb-16 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient"></div>
      
      {/* Animated Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-600/30 to-indigo-600/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-fuchsia-600/20 to-pink-600/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      {/* Animated Stars/Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-50 animate-stars"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-[200px] font-black text-white select-none">FLY</div>
        <div className="absolute top-40 right-10 text-[150px] font-black text-white select-none">SAFE</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Hero Content */}
        <div className="text-center mb-8">
          {/* Small airplane icons */}
          <div className="flex justify-center gap-8 mb-6">
            <span className="text-4xl opacity-50 animate-float">✈️</span>
            <span className="text-5xl animate-float-delayed">✈️</span>
            <span className="text-4xl opacity-50 animate-float">✈️</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Fly smarter with
            <br />
            <span className="gradient-text">
              seamless comfort now
            </span>
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto mb-8">
            Find your dream flight with comfort and explore routes while enjoying seamless booking today
          </p>

          {/* Scroll indicator */}
          <div className="flex justify-center mb-12">
            <div className="w-6 h-10 border-2 border-violet-400/50 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-gradient-to-b from-violet-400 to-fuchsia-500 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>

        {/* Airplane Image */}
        <div className="relative flex justify-center mb-8">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80"
            alt="Airplane"
            className="w-full max-w-4xl h-72 object-cover rounded-3xl shadow-2xl shadow-violet-500/20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent rounded-3xl max-w-4xl mx-auto"></div>
        </div>

        {/* Booking Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 max-w-5xl mx-auto -mt-16 relative z-20 border border-white/20">
          {/* Trip Type & Class Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setTripType('oneway')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  tripType === 'oneway'
                    ? 'gradient-btn text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ● One Way
              </button>
              <button
                onClick={() => setTripType('round')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  tripType === 'round'
                    ? 'gradient-btn text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Round Trip
              </button>
              <button
                onClick={() => setTripType('multi')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  tripType === 'multi'
                    ? 'gradient-btn text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Multi City
              </button>
            </div>

            <div className="flex items-center gap-4">
              <select className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium focus:outline-none">
                <option>Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </select>
              <span className="text-gray-500 text-sm">📅 Mon, 06 Oct 2026</span>
              <span className="text-gray-500 text-sm">👤 1 adult</span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
            {/* From */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-xs text-gray-400 mb-1">Departure City</p>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <input type="text" placeholder="Singapore" className="bg-transparent w-full text-gray-800 font-medium focus:outline-none" />
              </div>
            </div>

            {/* Swap Button */}
            <div className="hidden md:flex justify-center -mx-4">
              <button className="w-10 h-10 gradient-btn rounded-full flex items-center justify-center text-white">
                ⇄
              </button>
            </div>

            {/* To */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-xs text-gray-400 mb-1">Arrival City</p>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-fuchsia-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <input type="text" placeholder="Tokyo" className="bg-transparent w-full text-gray-800 font-medium focus:outline-none" />
              </div>
            </div>

            {/* Date */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-xs text-gray-400 mb-1">Departure - Return</p>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-800 font-medium">04 Dec 2026</span>
              </div>
            </div>

            {/* Search Button */}
            <button className="gradient-btn text-white p-4 rounded-xl flex items-center justify-center gap-2 font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
