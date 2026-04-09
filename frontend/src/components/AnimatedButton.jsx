'use client';
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const AnimatedButton = ({ text, bgcolor }) => {
  const buttonRef = useRef(null);
  const bgRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const bg = bgRef.current;

    const onMouseEnter = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (tweenRef.current) tweenRef.current.kill();

      gsap.set(bg, { clipPath: `circle(0% at ${x}px ${y}px)` });
      tweenRef.current = gsap.to(bg, {
        clipPath: `circle(150% at ${x}px ${y}px)`,
        duration: 1,
        ease: "power2.out",
      });
    };

    const onMouseLeave = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (tweenRef.current) tweenRef.current.kill();
      tweenRef.current = gsap.to(bg, {
        clipPath: `circle(0% at ${x}px ${y}px)`,
        duration: 1,
        ease: "power2.in",
      });
    };

    button.addEventListener('mouseenter', onMouseEnter);
    button.addEventListener('mouseleave', onMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', onMouseEnter);
      button.removeEventListener('mouseleave', onMouseLeave);
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .liquid-btn {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;
          border: none;
          padding: 0;
          pointer-events: auto; 
        }

        .liquid-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${bgcolor && !bgcolor.startsWith('bg-') ? bgcolor : '#fb923c'};
          pointer-events: none;
          z-index: 1;
        }

        .btn-text {
          position: relative;
          z-index: 2;
          color: #ffffff;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          white-space: nowrap;
          user-select: none;
          pointer-events: none;
        }
      `}</style>

      <div ref={buttonRef} className="liquid-btn">
        <div
          ref={bgRef}
          className="liquid-bg"
          style={{ clipPath: 'circle(0% at 50% 50%)' }}
        />
        <span className="btn-text">{text}</span>
      </div>
    </>
  );
};

export default AnimatedButton;