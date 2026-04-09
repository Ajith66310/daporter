import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FaqSection from "../components/FaqSection";
import { img } from "../assets/assest"; 

gsap.registerPlugin(ScrollTrigger);

// --- DATA STRUCTURE ---
export const WORK_DATA = [
  {
    id: 1,
    panels: [
      {
        title: "Bheem",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        img: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&w=1200",
      },
      {
        title: "reflect",
        body: "Spaces designed for quiet reflection. Wood, stone, and soft light.",
        img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
      },
    ],
    sticky: {
      img: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&w=1200",
      eyebrow: "Where We Are Bro",
      body: "ZettaJoule provides clean, reliable heat and power.",
      heading: "Energy demand projections show significant shifts by 2050.",
      cta: "Discover Story",
    },
    ourWork: {
      heading: "Modernizing\nProven Technology",
      body: "We're the only Western advanced SMR company modernizing established technology.",
      cta: "Explore Our Technology",
      videosRaw: [
        "https://www.w3schools.com/html/mov_bbb.mp4",
        "https://www.w3schools.com/html/movie.mp4",
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      ],
      videosPhone: [
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      ]
    },
  },
  {
    id: 2,
    panels: [
      {
        title: "Aurora",
        body: "Harnessing the raw power of geothermal energy.",
        img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
      },
      {
        title: "Pulse",
        body: "Real-time grid analytics for the cities of tomorrow.",
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80",
      },
    ],
    sticky: {
      img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
      eyebrow: "Product Two",
      body: "Aurora taps geothermal reservoirs for zero-carbon power.",
      heading: "Geothermal will cover 18% of global electricity by 2040.",
      cta: "Explore Aurora",
    },
    ourWork: {
      heading: "Deep Heat,\nClean Future",
      body: "Aurora's closed-loop system extracts heat from depths of 3–5 km.",
      cta: "See the Technology",
      videosRaw: [
        "https://www.w3schools.com/html/mov_bbb.mp4",
        "https://www.w3schools.com/html/movie.mp4",
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      ],
      videosPhone: [
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      ]
    },
  },
];

const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

export default function IntegratedWorkPage() {
  const { id } = useParams();
  const numericId = Number(id);
  const data = WORK_DATA.find((d) => d.id === numericId);

  if (!data) return <div className="text-white p-20">Project not found.</div>;

  return (
    <div className="bg-[#080808]">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap'); .font-syne { font-family: 'Syne', sans-serif; }`}</style>
      <HeroPanels panels={data.panels} />
      <StickySection sticky={data.sticky} />
      <WorkHeader ourWork={data.ourWork} />
      <WorkVideoAnimation ourWork={data.ourWork} />
      <FaqSection />
    </div>
  );
}

// --- COMPONENTS ---

function HeroPanels({ panels }) {
  const panelsRef = useRef(null);
  const imgRefs = useRef([]);
  const imageWrapRefs = useRef([]);
  const titleRefs = useRef([]);
  const bodyRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      panels.forEach((_, i) => {
        if (i > 0) {
          tl.fromTo([bodyRefs.current[i], titleRefs.current[i]],
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" }, "-=0.4"
          );
        }
        if (i < panels.length - 1) {
          tl.to(imageWrapRefs.current[i], { clipPath: "inset(0 0 100% 0)", ease: "none", duration: 1 })
            .fromTo(imgRefs.current[i + 1], { scale: 1.2 }, { scale: 1, duration: 1, ease: "none" }, "<");
        }
      });

      ScrollTrigger.create({
        animation: tl,
        trigger: panelsRef.current,
        start: "top top",
        end: () => `+=${panels.length * 100}%`,
        scrub: 1,
        pin: true,
      });
    }, panelsRef);
    return () => ctx.revert();
  }, [panels]);

  return (
    <main ref={panelsRef} className="relative w-full h-screen overflow-hidden bg-black font-syne">
      {panels.map((panel, i) => (
        <section key={i} className="absolute inset-0 w-full h-full" style={{ zIndex: panels.length - i }}>
          <div ref={(el) => (imageWrapRefs.current[i] = el)} className="absolute inset-0 w-full h-full overflow-hidden" style={{ clipPath: "inset(0 0 0% 0)" }}>
            <img ref={(el) => (imgRefs.current[i] = el)} src={panel.img} className="absolute inset-0 w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
            <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-20">
              <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                <p ref={(el) => (bodyRefs.current[i] = el)} className="max-w-xs text-white/90 font-light text-sm md:text-base">{panel.body}</p>
                <h2 ref={(el) => (titleRefs.current[i] = el)} className="font-bold uppercase leading-[0.8] text-[#f0ebe4] tracking-tighter" style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}>{panel.title}</h2>
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}

function StickySection({ sticky }) {
  const [progress, setProgress] = useState(0);
  const stickyRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (!stickyRef.current) return;
      const parent = stickyRef.current.parentElement;
      const rect = parent.getBoundingClientRect();
      const totalScroll = parent.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      setProgress(Math.min(Math.max(scrolled / totalScroll, 0), 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ep = ease(progress);
  const top = lerp(300, 0, ep);
  const left = lerp(47, 0, ep);
  const right = lerp(10, 0, ep);
  const height = lerp(400, typeof window !== "undefined" ? window.innerHeight : 900, ep);
  const br = lerp(4, 0, ep);

  return (
    <div className="relative bg-[#f9f9f7] font-syne">
      <div style={{ height: "300vh" }}>
        <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden bg-[#f9f9f7]">
          <div className="absolute inset-0 p-[80px_10%]" style={{ opacity: Math.max(1 - progress * 2.5, 0) }}>
            <div className="max-w-275 mx-auto grid grid-cols-[1fr_1.2fr] gap-10">
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#888] mb-10">{sticky.eyebrow}</p>
                <p className="text-sm leading-relaxed text-[#555] max-w-70 pt-40">{sticky.body}</p>
              </div>
              <div className="pt-2">
                <h2 className="text-2xl font-light text-[#1a1a1a] mb-8">{sticky.heading}</h2>
                <button className="flex items-center gap-3 bg-[#e8e8e3] rounded-full px-5 py-2 text-[11px] uppercase text-[#444]">
                   <span className="bg-white w-6 h-6 rounded-full flex items-center justify-center">↳</span> {sticky.cta}
                </button>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", top: `${top}px`, left: `${left}%`, right: `${right}%`, height: `${height}px`, zIndex: 5 }}>
            <img src={sticky.img} className="w-full h-full object-cover" style={{ borderRadius: `${br}px`, filter: "brightness(0.8)" }} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. New Component for Header Text
function WorkHeader({ ourWork }) {
  return (
    <section className="bg-[#f9f9f7] font-syne pt-24 pb-12">
      <div className="max-w-[1150px] mx-auto px-[5%] grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
        <div>
          <h1 className="text-[clamp(30px,3.5vw,42px)] leading-[1.2] font-light text-[#1a1a1a] whitespace-pre-line uppercase tracking-tight">
            {ourWork.heading}
          </h1>
        </div>
        <div className="flex flex-col pt-5">
          <p className="text-[13px] leading-[1.8] text-[#555] max-w-[340px] mb-8 border-l border-black/10 pl-6">
            {ourWork.body}
          </p>
          <button className="flex items-center self-start gap-2.5 bg-[#e8e8e3] rounded-full p-2.5 pr-4 text-[11px] uppercase text-[#444]">
            <span className="bg-white w-5 h-5 rounded-full flex items-center justify-center text-xs">↗</span>
            {ourWork.cta}
          </button>
        </div>
      </div>
    </section>
  );
}

// 3. New Component for Pinned Animation
function WorkVideoAnimation({ ourWork }) {
  const triggerRef = useRef(null);
  const cardRefs = useRef([]);
  const rawVideoRefs = useRef([]);
  const phoneVideoRefs = useRef([]);
  const frameRefs = useRef([]);

  const PHONE_W = 260;
  const PHONE_H = 530;
  const PHONE_GAP = 24;
  const FRAME_IMG = img.iphoneframe;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current;
      const rawVids = rawVideoRefs.current;
      const phoneVids = phoneVideoRefs.current;
      const frames = frameRefs.current;

      gsap.set(cards, { x: 0, borderRadius: "0px" });
      gsap.set(rawVids, { borderRadius: "0px" });
      gsap.set(frames, { opacity: 0 });
      gsap.set(phoneVids, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=200%", // Length of the pin/animation
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Same Animation Sequence
      tl.to(cards[0], { x: -(PHONE_W + PHONE_GAP), borderRadius: "44px", duration: 1, ease: "power2.inOut" }, 0)
        .to(cards[2], { x: (PHONE_W + PHONE_GAP), borderRadius: "44px", duration: 1, ease: "power2.inOut" }, 0)
        .to(cards[1], { borderRadius: "44px", duration: 1, ease: "power2.inOut" }, 0)
        .to(rawVids, { borderRadius: "44px", duration: 1, ease: "power2.inOut" }, 0)
        .to(frames, { opacity: 1, duration: 0.8, ease: "power1.inOut", stagger: 0.08 }, 1.1)
        .to(phoneVids, { opacity: 1, duration: 0.8, ease: "power1.inOut", stagger: 0.08 }, 1.6);
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="bg-[#f9f9f7] h-screen w-full flex items-center justify-center overflow-hidden">
      <div style={{ position: "relative", width: `${PHONE_W}px`, height: `${PHONE_H}px` }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            style={{
              position: "absolute",
              width: `${PHONE_W}px`, height: `${PHONE_H}px`,
              left: i === 0 ? `-${PHONE_W}px` : i === 2 ? `${PHONE_W}px` : "0px",
              overflow: "hidden",
              zIndex: i === 1 ? 2 : 1
            }}
          >
            {/* Layer 1: Raw Video */}
            <video
              ref={(el) => (rawVideoRefs.current[i] = el)}
              src={ourWork.videosRaw[i]}
              loop muted playsInline autoPlay
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Layer 2: Inner Video (Framed) */}
            <video
              ref={(el) => (phoneVideoRefs.current[i] = el)}
              src={ourWork.videosPhone[i]}
              loop muted playsInline autoPlay
              className="absolute z-[1] object-cover"
              style={{
                top: "2%", left: "4%", right: "4%", bottom: "2%",
                width: "92%", height: "96%", borderRadius: "36px"
              }}
            />
            <img
              ref={(el) => (frameRefs.current[i] = el)}
              src={FRAME_IMG}
              alt="frame"
              className="absolute inset-0 w-full h-full object-fill z-[2] pointer-events-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
}