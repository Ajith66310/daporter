import { useEffect, useRef, useState } from "react";

const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const STICKY_CONTENT = {
  img: "https://images.unsplash.com/photo-1534008897995-27a23e859048?w=600&q=80",
  eyebrow: "Where We Are, Where We Are, Where We Are ",
  body: "We provide clean, reliable heat and power for every occasion. Quality you can taste in every single bite. We provide clean, reliable heat and power for every occasion.",
  heading: "Quality you can taste in every single bite. We provide clean, reliable heat and power for every occasion. Quality you can taste in every single bite.",
  cta: "Discover Our Story",
};

export default function StickyImg() {
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
    <div className="relative bg-white font-syne">
      <div style={{ height: "300vh" }}>
        <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden bg-white">

          <div
            className="absolute inset-0 p-[80px_10%]"
            style={{ opacity: Math.max(1 - progress * 2.5, 0) }}
          >
            <div className="max-w-275 mx-auto grid grid-cols-[1fr_1.2fr] gap-10">
              <div>
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#888] mb-10">
                  {STICKY_CONTENT.eyebrow}
                </p>
                <p className="text-sm leading-relaxed text-[#555] max-w-70 pt-40">
                  {STICKY_CONTENT.body}
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-light text-[#1a1a1a] mb-8">
                  {STICKY_CONTENT.heading}
                </h2>
                <button className="flex items-center gap-3 bg-black rounded-full px-5 py-2 text-[11px] uppercase text-white">
                  {STICKY_CONTENT.cta}
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: `${top}px`,
              left: `${left}%`,
              right: `${right}%`,
              height: `${height}px`,
              zIndex: 5,
            }}
          >
            <img
              src={STICKY_CONTENT.img}
              className="w-full h-full object-cover"
              style={{ borderRadius: `${br}px`, filter: "brightness(0.8)" }}
              alt=""
            />
          </div>

        </div>
      </div>
    </div>
  );
}