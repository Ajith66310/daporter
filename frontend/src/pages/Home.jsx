import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Bestseller from "../components/Bestseller";
import StickyImg from "../components/StickyImg";
import OurProducts from "../components/OurProducts";
import Footer from "../components/Footer";
import Testimonial from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import FlowingMenu from "../components/FlowingMenu";

const Home = () => {
  return (
    <>
      <div
        style={{
          position: "relative",
          zIndex: 10,
          marginBottom: "60vh",
          background: "#fff",
        }}
      >
        <Hero />
        <Marquee />
        <Bestseller />
        <StickyImg />
        <OurProducts />
        <FlowingMenu/>
        <Testimonial/>
        <Newsletter/>
      </div>
      <Footer />
    </>
  );
};

export default Home;