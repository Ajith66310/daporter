import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    bg: "bg-blue-600", 
    number: "200+",
    label: "Taste Iterations",
    desc: "Refined until the flavour feels just right.",
  },
  {
    bg: "bg-yellow-500",
    number: "30+",
    label: "Test Batches",
    desc: "Small batches. Big attention to detail.",
  },
  {
    bg: "bg-green-600",
    number: "100%",
    label: "Natural Ingredients",
    desc: "No shortcuts. No compromises.",
  },
];

const OurProcess = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const cards = cardsRef.current;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",     
        end: `+=${cards.length * 100}%`, 
        pin: true,            
        scrub: 1,              
        anticipatePin: 1,
      },
    });

    cards.forEach((card, i) => {
      if (i === 0) return; 

      tl.fromTo(
        card,
        { yPercent: 120, scale: 0.9, opacity: 0.5 },
        { 
          yPercent: 0, 
          scale: 1, 
          opacity: 1, 
          duration: 1,
          ease: "power1.inOut" 
        },
        "-=0.5" 
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-white">
       
      <section 
        ref={sectionRef} 
        className="relative h-screen overflow-hidden flex items-center justify-center p-6 md:p-20"
      >
        <div className="grid grid-cols-12 gap-10 w-full max-w-7xl items-center">
          
          {/* Left Side:  Content */}
          <div className="col-span-12 lg:col-span-5">
            <h2 className="text-5xl font-bold leading-tight mb-6">
              What goes into every bar of <span className="text-orange-500">MELT</span>
            </h2>
            <p className="text-lg text-gray-600">
              Every bar is a result of careful sourcing, precise timing, and
              countless taste tests — all to make sure each bite feels intentional.
            </p>
          </div>

          {/* Right Side: The Stack */}
          <div className="col-span-12 lg:col-span-7 relative h-125 flex items-center justify-center">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                ref={(el) => (cardsRef.current[i] = el)}
                className={`
                  absolute top-0 left-0 w-full h-full 
                  ${stat.bg} text-white rounded-3xl p-12
                  flex flex-col justify-between
                  shadow-2xl
                `}
                style={{ 
                    zIndex: i,
                    marginTop: i * 10, 
                    marginLeft: i * 10 
                }}
              >
                <div>
                  <div className="text-7xl font-bold mb-2">{stat.number}</div>
                  <div className="text-3xl font-semibold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
                <div className="max-w-xs text-xl opacity-90">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurProcess;