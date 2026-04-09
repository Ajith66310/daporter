import React, { useRef, useEffect } from 'react'
import Core from 'smooothy'

const slidesData = [
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", username: "@john_doe", color: '#f4ede9' },
  { text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking.", username: "@jane_smith", color: '#f4ede9' },
  { text: "Believe you can and you're halfway there. Your limitation it's only your imagination.", username: "@mike_wilson", color: '#f4ede9' },
  { text: "It does not matter how slowly you go as long as you do not stop. Keep moving forward.", username: "@sarah_jones", color: '#f4ede9' },
  { text: "Everything you've ever wanted is on the other side of fear. Take risks and embrace the unknown.", username: "@alex_brown", color: '#f4ede9' },
  { text: "The future belongs to those believe in the beauty of their dreams. Dream big, work hard.", username: "@emma_davis", color: '#f4ede9' },
  { text: "In the middle of difficulty lies opportunity. Challenges are what make life interesting.", username: "@chris_taylor", color: '#f4ede9' },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", username: "@lisa_martin", color: '#f4ede9' },
  { text: "Your time is limited, don't waste it living someone else's life. Follow your heart.", username: "@david_lee", color: '#f4ede9' },
  { text: "The only impossible journey is the one you never begin. Progress, not perfection.", username: "@amy_chen", color: '#f4ede9' },
];

const AUTO_SPEED = 0.6;
const RESUME_DELAY = 1500;

const Testimonials = () => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const slides = [...wrapper.children];

    const preventSelect = (e) => e.preventDefault();
    wrapper.addEventListener('selectstart', preventSelect);

    const slider = new Core(wrapper, {
      infinite: false,
      snap: false,
      variableWidth: true,
      lerpFactor: 0.05,
      speedDecay: 0.97,
      bounceLimit: 0,
      setOffset: ({ itemWidth, totalWidth }) => {
        const gap = window.innerWidth < 1024 ? window.innerWidth * 0.04 : window.innerWidth * 0.015;
        const lastSlideOffset = (slidesData.length - 1) * (itemWidth + gap);
        return totalWidth - lastSlideOffset;
      },
      onUpdate: (instance) => {
        const vwOffset = window.innerWidth < 1024 ? window.innerWidth * 0.15 : window.innerWidth * 0.08;

        slides.forEach((slide, i) => {
          const slideWidth = slide.offsetWidth;
          const slideLeft = slide.offsetLeft + instance.current;
          const bgColor = slidesData[i].color;
          const isLast = i === slidesData.length - 1;

          if (slideLeft < 0 && !isLast) {
            const ratio = Math.min(1, Math.abs(slideLeft) / slideWidth);
            slide.style.cssText = `
              background-color: ${bgColor};
              border: 2px solid rgba(0,0,0,0.6);
              transform-origin: left 80%;
              transform: translateX(${instance.current + Math.abs(slideLeft) + ratio * vwOffset}px) rotate(${-15 * ratio}deg) scale(${1 - ratio * 0.3});
              position: relative;
              z-index: ${i + 1};
            `
          } else {
            slide.style.cssText = `
              background-color: ${bgColor};
              border: 2px solid rgba(0, 0, 0, 0.6);
              transform: translateX(${instance.current}px);
              z-index: ${i + 1};
            `
          }
        })
      }
    })

    let animId;
    let autoDirection = -1;
    let isAutoPlaying = true;
    let resumeTimer = null;
    let wasDragging = false;
    let momentum = 0;
    const MOMENTUM_MULTIPLIER = 10;
    const MOMENTUM_DECAY = 0.96;

    function isLastVisible() {
      const triggerIndex = slidesData.length - 1;
      const triggerSlide = slides[triggerIndex];
      if (!triggerSlide) return false;
      const slideLeft = triggerSlide.offsetLeft + slider.target;
      return slideLeft <= (wrapper.offsetWidth - 100);
    }

    function animate() {
      slider.update();

      if (slider.isDragging) {
        isAutoPlaying = false;
        wasDragging = true;
        momentum = 0;
        if (resumeTimer) { clearTimeout(resumeTimer); resumeTimer = null; }
      } else if (wasDragging) {
        momentum = slider.speed * MOMENTUM_MULTIPLIER;
        wasDragging = false;
        resumeTimer = setTimeout(() => { isAutoPlaying = true; }, RESUME_DELAY);
      }

      if (Math.abs(momentum) > 0.5) {
        slider.target += momentum;
        momentum *= MOMENTUM_DECAY;
        slider.target = Math.max(slider.maxScroll, Math.min(0, slider.target));
      }

      if (isAutoPlaying) {
        if (autoDirection === -1 && isLastVisible()) autoDirection = 1;
        if (autoDirection === 1 && slider.target >= 0) { slider.target = 0; autoDirection = -1; }
        slider.target += autoDirection * AUTO_SPEED;
        slider.target = Math.max(slider.maxScroll, Math.min(0, slider.target));
      }

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (resumeTimer) clearTimeout(resumeTimer);
      wrapper.removeEventListener('selectstart', preventSelect);
      slider.destroy();
    }
  }, [])

  return (
    <div className='w-full h-150 flex items-center bg-white relative overflow-hidden'>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');`}</style>

      <div className='absolute left-0 top-0 h-full w-4 lg:w-15 bg-white z-20' />

      <div className='w-full h-full relative z-10 pl-6 lg:pl-20'>
        <div ref={wrapperRef} className='flex h-full items-center will-change-transform'>
          {slidesData.map((slide, index) => (
            <div
              key={index}
              className={`
                shrink-0 pointer-events-none
                w-[75vw] h-[90vw]
                md:w-[40vw] md:h-[50vw]
                lg:w-[22vw] lg:h-[28vw]
                rounded-[4vw] lg:rounded-[1.5vw]
                flex flex-col justify-between
                p-[6vw] lg:p-[1.8vw]
                ${index < slidesData.length - 1 ? 'mr-[4vw] lg:mr-[1.5vw]' : ''}
              `}
              style={{ backgroundColor: slide.color, border: '2px solid rgba(0, 0, 0, 0.6)' }}
            >
              <p
                className="text-[5vw] md:text-[3vw] lg:text-[1.4vw] font-medium leading-tight text-black"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                "{slide.text}"
              </p>

              <div className="flex items-center gap-[2vw] lg:gap-[0.6vw]">
                <img
                  src={`https://i.pravatar.cc/150?img=${index + 1}`}
                  alt={slide.username}
                  className="w-[8vw] h-[8vw] lg:w-[2.2vw] lg:h-[2.2vw] rounded-full object-cover shrink-0"
                />
                <p
                  className="text-[3.5vw] md:text-[2vw] lg:text-[1.1vw] font-bold tracking-tight text-black/50"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {slide.username}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='absolute right-0 top-0 h-full w-4 lg:w-15 bg-white z-20' />
    </div>
  )
}

export default Testimonials;