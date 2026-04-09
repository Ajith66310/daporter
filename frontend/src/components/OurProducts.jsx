import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=700&q=80",
    alt: "Nature landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=700&q=80",
    alt: "Ocean view",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&q=80",
    alt: "Forest path",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80",
    alt: "Mountain peak",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=700&q=80",
    alt: "Golden sunrise",
  },
];

export default function OurProducts() {
  return (
    <section
      className="px-12 py-20 bg-white"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
        .gallery-swiper {
          overflow: hidden !important;
          cursor: grab;
        }
        .gallery-swiper:active {
          cursor: grabbing;
        }
        .gallery-swiper .swiper-wrapper {
          align-items: center;
          transition-timing-function: linear !important;
        }
        .gallery-slide {
          height: 220px !important;
          width: 320px !important;
          border-radius: 16px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .gallery-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          display: block;
        }
        .gallery-slide:hover img {
          transform: scale(1.06);
        }
      `}</style>

      <p
        className="font-normal leading-snug mb-10"
        style={{
          fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
          letterSpacing: "-0.025em",
          maxWidth: "820px",
        }}
      >
        With a love for nature and exploration,{" "}
        <span style={{ color: "#c8612a" }}>
          we create meaningful routes that inspire, connect, and stay forever in
          memory.
        </span>
      </p>

      <div
        style={{
          margin: "0 -3rem",
          position: "relative",
        }}
      >
        {/* Left fade wall */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "50px",
            height: "100%",
            background: "#fff",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "50px",
            height: "100%",
            background: "#fff",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        <Swiper
          modules={[Autoplay, FreeMode]}
          freeMode={{
            enabled: true,
            momentum: true,
            momentumRatio: 0.8,
            momentumVelocityRatio: 0.6,
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={4000}
          loop={true}
          grabCursor={true}
          slidesPerView="auto"
          spaceBetween={14}
          className="gallery-swiper"
        >
          {[...galleryImages, ...galleryImages].map((img, index) => (
            <SwiperSlide key={index} className="gallery-slide">
              <img src={img.src} alt={img.alt} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex items-center justify-between mt-8">
        <p className="text-sm text-neutral-500 leading-relaxed">
          Would you like to explore more routes
          <br />
          or customize this trip for your group?
        </p>
      </div>
    </section>
  );
}