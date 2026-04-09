import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { StarIcon } from '@heroicons/react/20/solid';

// Import Swiper styles
import 'swiper/css';

const testimonials = [
  {
    name: 'Jake O',
    stars: 5,
    quote: 'Digital Download Was Nice. I was able to download a print and bring it to Staples the same day.',
    location: 'Edmonton, Canada',
  },
  {
    name: 'Ryan',
    stars: 5,
    quote: 'Finally, something I can hang in my living room. Really dig the look of these prints.',
    location: 'Coventry, United Kingdom',
  },
  {
    name: 'Madi P',
    stars: 5,
    quote: 'Bought for my boyfriend. He loves them! Something we can hang in the house that we both like!',
    location: 'Austin, United States',
  },
  {
    name: 'Tony',
    stars: 5,
    quote: 'Sweet. Found a print of my S15!',
    location: 'Vancouver, Canada',
  },
  // Adding duplicates helps Swiper maintain a smooth loop at high speeds
  {
    name: 'Jake O',
    stars: 5,
    quote: 'Digital Download Was Nice. I was able to download a print and bring it to Staples the same day.',
    location: 'Edmonton, Canada',
  },
];

export default function Testimonial() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400..800&display=swap');
        
        .testimonial-container {
          font-family: 'Syne', sans-serif;
        }

        /* Essential for smooth continuous marquee effect */
        .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>

      <div className="testimonial-container relative min-h-screen w-full bg-[#1a1a1a] overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=2940&auto=format&fit=crop"
            alt="Gallery background"
            className="w-full h-full object-cover brightness-[0.5] blur-[1px]"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col items-center pt-24 pb-16 px-4 md:px-10 min-h-screen">
          
          <h1 className="text-center font-extrabold text-4xl md:text-7xl text-white uppercase tracking-tighter mb-20 max-w-7xl leading-[0.9]">
            Don't take our <br/> word for it
          </h1>

          <div className="w-full max-w-450">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={1.2}
              loop={true}
              speed={8000} // Adjust this for faster/slower scroll
              allowTouchMove={true} // Re-enabled user scrolling
              autoplay={{
                delay: 0,
                disableOnInteraction: false, // Keeps scrolling after user swipes
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1440: { slidesPerView: 4 },
              }}
              className="testimonial-swiper"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index} className="pb-10">
                  <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col justify-between h-100">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-black uppercase">
                          {testimonial.name}
                        </h2>
                        <div className="flex gap-0.5">
                          {[...Array(testimonial.stars)].map((_, i) => (
                            <StarIcon key={i} className="h-4 w-4 text-black" />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-6 text-gray-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs font-bold uppercase tracking-widest">Verified Customer</p>
                      </div>

                      <p className="text-lg text-black leading-tight font-medium">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
                      {testimonial.location}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}