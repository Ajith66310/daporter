import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const demoItems = [
  { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/600?random=1' },
  { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/600?random=2' },
  { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/600?random=3' },
  { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/600?random=4' }
];

function MenuItem({ link, text, image, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor }) {
  const itemRef = useRef(null);
  const marqueeRef = useRef(null);
  const marqueeInnerRef = useRef(null);
  const animationRef = useRef(null);
  const [repetitions, setRepetitions] = useState(2);

  const animationDefaults = { duration: 0.5, ease: 'power3.out' };

  const getDirection = (ev, element) => {
    const rect = element.getBoundingClientRect();
    const relativeY = ev.clientY - rect.top;
    return relativeY < rect.height / 2 ? 'top' : 'bottom';
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const part = marqueeInnerRef.current.querySelector('.marquee-part');
      if (!part) return;
      const needed = Math.ceil(window.innerWidth / part.offsetWidth) + 1;
      setRepetitions(needed);
    };
    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [text]);

  useEffect(() => {
    if (!marqueeInnerRef.current) return;
    const part = marqueeInnerRef.current.querySelector('.marquee-part');
    if (!part) return;

    if (animationRef.current) animationRef.current.kill();
    animationRef.current = gsap.to(marqueeInnerRef.current, {
      x: -part.offsetWidth,
      duration: speed,
      ease: 'none',
      repeat: -1
    });
  }, [repetitions, speed]);

  const handleMouseEnter = (ev) => {
    const dir = getDirection(ev, itemRef.current);
    gsap.timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: dir === 'top' ? '-100%' : '100%' })
      .set(marqueeInnerRef.current, { y: dir === 'top' ? '100%' : '-100%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
  };

  const handleMouseLeave = (ev) => {
    const dir = getDirection(ev, itemRef.current);
    gsap.timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: dir === 'top' ? '-100%' : '100%' })
      .to(marqueeInnerRef.current, { y: dir === 'top' ? '100%' : '-100%' });
  };

  return (
    <div
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex-1 border-b overflow-hidden cursor-pointer"
      style={{ borderColor: borderColor }}
    >
      <a
        href={link}
        className="flex items-center justify-center w-full h-full relative z-10 text-[7vh] font-extrabold uppercase transition-opacity duration-300 group-hover:opacity-0"
        style={{ color: textColor, fontFamily: 'Syne, sans-serif' }}
      >
        {text}
      </a>

      <div
        ref={marqueeRef}
        className="absolute inset-0 pointer-events-none overflow-hidden translate-y-full"
        style={{ backgroundColor: marqueeBgColor }}
      >
        {/* Added h-full to inner container */}
        <div ref={marqueeInnerRef} className="flex h-full w-fit items-center">
          {[...Array(repetitions)].map((_, i) => (
            <div key={i} className="marquee-part flex items-center h-full shrink-0">
              <span 
                className="text-[7vh] font-extrabold uppercase px-[4vw]"
                style={{ color: marqueeTextColor, fontFamily: 'Syne, sans-serif' }}
              >
                {text}
              </span>

              {/* IMAGE CARD: Updated to h-full and removed rounded-lg for a seamless flush look */}
              <div className="w-[320px] h-full mx-[2vw] overflow-hidden bg-gray-100 border-x border-white/10 shadow-xl">
                <img 
                  src={image} 
                  alt={text} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FlowingMenu() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap');
      `}</style>
      
      <div className="w-full h-screen bg-white flex flex-col pb-20">
        <nav className="flex flex-col flex-1 border-t border-gray-100">
          {demoItems.map((item, idx) => (
            <MenuItem 
              key={idx} 
              {...item} 
              speed={8}
              textColor="#000000"
              marqueeBgColor="#000000" 
              marqueeTextColor="#ffffff"
              borderColor="#f3f3f3"
            />
          ))}
        </nav>
      </div>
    </>
  );
}