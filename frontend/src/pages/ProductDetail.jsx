import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";

const Products = [
  {
    id: 1,
    title: "Plastic Cups for Every Occasion",
    subtitle: "Versatile food-grade cups for beverages and cold drinks",
    price: "$50 per 1000",
    img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80",
    category: "Drinkware",
  },
  {
    id: 2,
    title: "Forest Retreat Cup",
    subtitle: "Eco-conscious cups for outdoor events",
    price: "$45 per 1000",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
    category: "Outdoor",
  },
  {
    id: 3,
    title: "Coastal Discovery Set",
    subtitle: "Durable cups for beach and coastal gatherings",
    price: "$55 per 1000",
    img: "https://images.unsplash.com/photo-1534008897995-27a23e859048?w=600&q=80",
    category: "Events",
  },
  {
    id: 4,
    title: "Desert Adventure Pack",
    subtitle: "Heat-resistant cups for any environment",
    price: "$60 per 1000",
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
    category: "Heavy Duty",
  },
  {
    id: 5,
    title: "Alpine Trails Edition",
    subtitle: "Lightweight cups for high-altitude events",
    price: "$48 per 1000",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
    category: "Lightweight",
  },
  {
    id: 6,
    title: "Island Escape Series",
    subtitle: "Crystal-clear cups perfect for tropical settings",
    price: "$52 per 1000",
    img: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=80",
    category: "Premium",
  },
];

function ProductCard({ id, title, subtitle, price, img, category }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="relative rounded-2xl overflow-hidden cursor-pointer group bg-white border border-gray-100"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span
            style={{
              background: "#000",
              color: "#fff",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: "999px",
            }}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 700,
            lineHeight: 1.3,
            marginBottom: "6px",
            color: "#111",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "12px",
            color: "#888",
            marginBottom: "12px",
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>
        <div className="flex items-center justify-between">
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#111" }}>
            {price}
          </span>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#fff",
              background: "#111",
              padding: "6px 14px",
              borderRadius: "999px",
              letterSpacing: "0.05em",
              transition: "background 0.2s",
            }}
            className="group-hover:bg-orange-500"
          >
            View →
          </span>
        </div>
      </div>
    </div>
  );
}

const btnStyle = (disabled) => ({
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  border: "none",
  background: disabled ? "#C8C8C8" : "#000",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: disabled ? "not-allowed" : "pointer",
  transition: "background 0.3s ease",
  pointerEvents: disabled ? "none" : "auto",
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
        spaceBetween={16}
        breakpoints={{
          0:    { slidesPerView: 1 },
          640:  { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {Products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}