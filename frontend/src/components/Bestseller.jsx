import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Products = [
  {
    title: "Mountain Expedition",
    img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80",
  },
  {
    title: "Forest Retreat",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
  },
  {
    title: "Coastal Discovery",
    img: "https://images.unsplash.com/photo-1534008897995-27a23e859048?w=600&q=80",
  },
  {
    title: "Desert Adventure",
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
  },
  {
    title: "Alpine Trails",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
  },
  {
    title: "Island Escape",
    img: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=80",
  },
];

function ProductCard({ title, img }) {
  return (
    <div className="relative rounded-2xl overflow-hidden h-80 cursor-pointer group">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <p className="font-bold text-base mb-1">{title}</p>
        <p className="text-xs opacity-80 font-normal uppercase tracking-wider">
          Explore Project
        </p>
      </div>
    </div>
  );
}

const btnStyle = (disabled) => ({
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  border: 'none',
  background: disabled ? '#C8C8C8' : '#000',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: disabled ? 'not-allowed' : 'pointer',
  transition: 'background 0.3s ease',
  pointerEvents: disabled ? 'none' : 'auto',
});

export default function Bestseller() {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateBoundaries = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section
      className="px-12 pt-10"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
      `}</style>

      <div className="flex items-end justify-between mb-7">
        <h1 className="font-normal tracking-tight text-5xl leading-[1.1]">
          Find Our Best
          <br />
          Products
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous"
            style={btnStyle(isBeginning)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next"
            style={btnStyle(isEnd)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateBoundaries(swiper);
        }}
        onSlideChange={updateBoundaries}
        slidesPerView={4}
        spaceBetween={12}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {Products.map((t, index) => (
          <SwiperSlide key={index}>
            <ProductCard {...t} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}