import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_PANELS = [
  {
    title: "Bheem",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  },
  {
    title: "Reflect",
    body: "Spaces designed for quiet reflection. Wood, stone, and soft light.",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
  },
  {
    title: "Aurora",
    body: "Harnessing the raw power of geothermal energy for a clean tomorrow.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  },
];

function initHeroAnimation({ panelsRef, imgRefs, imageWrapRefs, titleRefs, bodyRefs, btnRefs }, panelCount) {
  return gsap.context(() => {
    const tl = gsap.timeline();

    for (let i = 0; i < panelCount; i++) {
      if (i > 0) {
        tl.fromTo(
          [bodyRefs.current[i], titleRefs.current[i], btnRefs.current[i]],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        );
      }
      if (i < panelCount - 1) {
        tl.to(imageWrapRefs.current[i], {
          clipPath: "inset(0 0 100% 0)",
          ease: "none",
          duration: 1,
        }).fromTo(
          imgRefs.current[i + 1],
          { scale: 1.2 },
          { scale: 1, duration: 1, ease: "none" },
          "<"
        );
      }
    }

    ScrollTrigger.create({
      animation: tl,
      trigger: panelsRef.current,
      start: "top top",
      end: () => `+=${panelCount * 100}%`,
      scrub: 1,
      pin: true,
    });
  }, panelsRef);
}

export default function Hero() {
  const panelsRef     = useRef(null);
  const imgRefs       = useRef([]);
  const imageWrapRefs = useRef([]);
  const titleRefs     = useRef([]);
  const bodyRefs      = useRef([]);
  const btnRefs       = useRef([]);

  imgRefs.current       = [];
  imageWrapRefs.current = [];
  titleRefs.current     = [];
  bodyRefs.current      = [];
  btnRefs.current       = [];

  useEffect(() => {
    const ctx = initHeroAnimation(
      { panelsRef, imgRefs, imageWrapRefs, titleRefs, bodyRefs, btnRefs },
      HERO_PANELS.length
    );
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');
        .font-syne { font-family: 'Syne', sans-serif; }
        .shop-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          color: #111;
          border: none;
          padding: 14px 32px;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s, color 0.25s;
        }
 
        .shop-btn svg {
          transition: transform 0.25s;
        }
      
      `}</style>

      <main
        ref={panelsRef}
        className="relative w-full h-screen overflow-hidden bg-black font-syne"
      >
        {HERO_PANELS.map((panel, i) => (
          <section
            key={i}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: HERO_PANELS.length - i }}
          >
            <div
              ref={(el) => { if (el) imageWrapRefs.current[i] = el; }}
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: "inset(0 0 0% 0)" }}
            >
              <img
                ref={(el) => { if (el) imgRefs.current[i] = el; }}
                src={panel.img}
                className="absolute inset-0 w-full h-full object-cover"
                alt={panel.title}
              />

              <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/70" />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 md:px-20">

                <p
                  ref={(el) => { if (el) bodyRefs.current[i] = el; }}
                  className="text-white/70 text-xs md:text-sm uppercase tracking-[0.2em] mb-5 font-light"
                >
                  {panel.body}
                </p>

                <h2
                  ref={(el) => { if (el) titleRefs.current[i] = el; }}
                  className="font-bold uppercase text-white tracking-tight leading-[0.85] mb-10"
                  style={{ fontSize: "clamp(4rem, 14vw, 12rem)" }}
                >
                  {panel.title}
                </h2>

                <div ref={(el) => { if (el) btnRefs.current[i] = el; }}>
                  <button className="shop-btn">
                    Shop Now

                  </button>
                </div>

              </div>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}