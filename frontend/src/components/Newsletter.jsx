const Newsletter = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 animate-gradient relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-700">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Subscribe Newsletter &
              <br />
              get latest News
            </h2>
            <p className="text-gray-400">
              Stay updated with our latest deals and travel tips.
            </p>
          </div>

          {/* Right - Form */}
          <div className="w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-6 py-3 bg-slate-800 border border-slate-600 text-white placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500 w-full sm:w-80"
              />
              <button className="gradient-btn text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
