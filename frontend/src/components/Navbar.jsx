import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { usePageTransition } from './TransitionProvider'
import gsap from 'gsap'
import AnimatedButton from './AnimatedButton'
import { img } from '../assets/assets'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/aboutus', label: 'About Us' },
  { to: '/affiliate', label: 'Affiliate' },
  { to: '/contact', label: 'Contact' },
]

const syneBase = { fontFamily: "'Syne', sans-serif", fontWeight: 400 }

// ── Cart Icon ────────────────────────────────────────────────────────────────
function CartIcon({ color = '#000', onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Cart"
      className="relative flex items-center justify-center w-9 h-9 cursor-pointer"
      style={{ background: 'none', border: 'none', padding: 0 }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    </button>
  )
}

// ── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const { navigateTo } = usePageTransition()
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth < 768) return
      const isScrolled = window.scrollY > 60

      if (isScrolled && !scrolled) {
        setScrolled(true)
        gsap.to(navRef.current, {
          borderRadius: '50px',
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingTop: '10px',
          paddingBottom: '10px',
          marginTop: '10px',
          backgroundColor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
          duration: 0.5,
          ease: 'power3.out',
        })
      } else if (!isScrolled && scrolled) {
        setScrolled(false)
        gsap.to(navRef.current, {
          borderRadius: '0px',
          paddingLeft: '0px',
          paddingRight: '0px',
          paddingTop: '20px',
          paddingBottom: '20px',
          marginTop: '0px',
          backgroundColor: 'rgba(255,255,255,0)',
          backdropFilter: 'blur(0px)',
          boxShadow: '0 0px 0px rgba(0,0,0,0)',
          duration: 0.5,
          ease: 'power3.inOut',
        })
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrolled])

  const handleNav = (to, e) => {
    e.preventDefault()
    setMenuOpen(false)
    navigateTo(to)
  }

  // White when transparent (top), black when sticky (scrolled)
  const linkColor = scrolled ? 'text-black' : 'text-white'
  const linkHover = scrolled ? 'hover:text-black/60' : 'hover:text-white/70'
  const cartColor = scrolled ? '#000' : '#fff'

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');`}</style>

      {/* ── Desktop ── */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center items-center w-full pointer-events-none px-4 md:px-10 lg:px-15">
        <nav
          ref={navRef}
          className="pointer-events-auto relative flex flex-row items-center justify-between w-full"
          style={{
            paddingLeft: '0px',
            paddingRight: '0px',
            paddingTop: '20px',
            paddingBottom: '20px',
            backgroundColor: 'rgba(255,255,255,0)',
            borderRadius: '0px',
            willChange: 'padding, background-color, border-radius',
          }}
        >
          {/* Logo */}
          <div className="shrink-0">
            <img
              src={`${scrolled ? img.logo  : img.logo2}`}
              alt="Logo"
              className={`cursor-pointer transition-all duration-300 ${scrolled ? 'w-28' : 'w-35'}`}
              onClick={() => navigateTo('/')}
            />
          </div>

          {/* Centre links */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <ul className={`flex flex-row ${scrolled ? 'gap-6' : 'gap-8'}`}>
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={(e) => { e.preventDefault(); navigateTo(to) }}
                    className={({ isActive }) =>
                      isActive
                        ? `${linkColor} transition-colors ${scrolled ? 'text-sm' : 'text-base'}`
                        : `${linkColor} ${linkHover} transition-colors ${scrolled ? 'text-sm' : 'text-base'}`
                    }
                    style={syneBase}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — CTA + Cart */}
          <div className="flex items-center gap-3">
            <AnimatedButton
              bgColor="#1a1a1a"
              textColor="#f5f0e8"
              hoverBgColor="#ffb86a"
              hoverTextColor="#1a1a1a"
            >
              <span style={syneBase}>Get In Touch</span>
            </AnimatedButton>
            <CartIcon color={cartColor} onClick={() => navigateTo('/cart')} />
          </div>
        </nav>
      </div>

      {/* ── Mobile ── */}
      <div className="md:hidden">
        <div
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3"
          style={{
            backgroundColor: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          <img
            src={img.logo}
            alt="Logo"
            className="w-24 cursor-pointer"
            onClick={() => navigateTo('/')}
          />

          <div className="flex items-center gap-2">
            <CartIcon color="#000" onClick={() => navigateTo('/cart')} />
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="flex flex-col justify-center items-center gap-1.5 w-8 h-8"
              aria-label="Toggle menu"
            >
              <span
                className="block h-0.5 w-6 bg-black transition-all duration-300"
                style={{ transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none' }}
              />
              <span
                className="block h-0.5 w-6 bg-black transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-0.5 w-6 bg-black transition-all duration-300"
                style={{ transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }}
              />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className="fixed top-13 left-0 right-0 z-40 overflow-hidden transition-all duration-300"
          style={{
            maxHeight: menuOpen ? '400px' : '0px',
            backgroundColor: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(12px)',
            borderBottom: menuOpen ? '1px solid rgba(0,0,0,0.06)' : 'none',
          }}
        >
          <ul className="flex flex-col px-4 py-4 gap-4">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={(e) => handleNav(to, e)}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-black text-base block py-1'
                      : 'text-gray-600 text-base block py-1'
                  }
                  style={syneBase}
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <AnimatedButton
                bgColor="#1a1a1a"
                textColor="#f5f0e8"
                hoverBgColor="#ffb86a"
                hoverTextColor="#1a1a1a"
              >
                <span style={syneBase}>Get In Touch</span>
              </AnimatedButton>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar