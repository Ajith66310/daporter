import React from 'react'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Testimonials from '../components/Testimonials'
import Bestseller from '../components/Bestseller'
import OurProducts from '../components/OurProducts'

const Home = () => {
  return (
    <>
      <>
        <Hero />
        <Marquee />
        <Bestseller />
        <OurProducts/>
        <Testimonials />
      </>
    </>
  )
}

export default Home