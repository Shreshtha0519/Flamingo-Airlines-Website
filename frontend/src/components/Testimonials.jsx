import { useState } from 'react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'John Doe',
      role: 'Marketing Expert',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      text: 'Booking with Flamingo Airlines was smooth and easy from start to finish. The service was amazing, the crew was kind, and every detail felt premium. My trip from Jakarta to Tokyo went perfectly, seats were comfortable, and check-in was super fast. Truly a five-star flying experience that I\'ll always remember and recommend.',
    },
    {
      name: 'Sarah Chen',
      role: 'Business Traveler',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      text: 'As someone who flies frequently for work, Flamingo Airlines has become my go-to choice. The business class experience is unmatched - spacious seats, excellent in-flight meals, and the staff goes above and beyond. Highly recommended!',
    },
    {
      name: 'Michael Ross',
      role: 'Adventure Blogger',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      text: 'I\'ve traveled with many airlines, but Flamingo stands out. The booking process was seamless, prices were competitive, and the flight itself was incredibly comfortable. Can\'t wait to fly with them again!',
    },
  ];

  const travelers = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-fuchsia-600/10 to-pink-600/10 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30 text-violet-300 text-sm px-4 py-2 rounded-full mb-4">
            ✦ Testimonial
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our travelers share their stories
            <br />
            and amazing flight journeys
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Hear from our happy flyers who enjoy premium travel and seamless trips worldwide today
          </p>
        </div>

        {/* Traveler Avatars */}
        <div className="flex justify-center -space-x-3 mb-12">
          {travelers.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Traveler"
              className="w-12 h-12 rounded-full border-2 border-slate-900 object-cover"
            />
          ))}
          <div className="w-12 h-12 rounded-full gradient-btn border-2 border-slate-900 flex items-center justify-center text-white text-sm font-medium">
            +2K
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 relative border border-violet-500/20">
            {/* Quote marks */}
            <span className="absolute top-6 left-8 text-6xl text-violet-500/20 font-serif">"</span>
            <span className="absolute bottom-6 right-8 text-6xl text-violet-500/20 font-serif">"</span>

            <p className="text-gray-300 text-lg leading-relaxed text-center mb-8 relative z-10">
              {testimonials[activeIndex].text}
            </p>

            <div className="text-center">
              <img
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].name}
                className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-violet-500 object-cover"
              />
              <h4 className="text-white font-semibold">{testimonials[activeIndex].name}</h4>
              <p className="text-gray-400 text-sm">{testimonials[activeIndex].role}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => setActiveIndex(activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1)}
              className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white hover:gradient-btn transition-all"
            >
              ←
            </button>
            <button
              onClick={() => setActiveIndex(activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1)}
              className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white hover:gradient-btn transition-all"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
