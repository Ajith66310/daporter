import { Route, Routes, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import Product from "./pages/Product";
import Layout from "./components/Layout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Favourite from "./pages/Favourite.jsx";
import Shipping from "./pages/Shipping.jsx";
import Orders from "./pages/Orders.jsx";
import NotFound from "./pages/NotFound.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";


function App() {


  return (
    <>
        <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="favourite" element={<Favourite />} />
          <Route path="shipping" element={<Shipping />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;