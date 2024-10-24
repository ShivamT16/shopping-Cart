import './index.css';
import { Routes, Route } from "react-router-dom";

import { Product } from "./Pages/Product";
import { Cart } from "./Pages/Cart";
import { Checkout } from "./Pages/Checkout";
import { Navbar } from "./Navbar";
import { ProductDetail } from "./Pages/ProductDetails";

export default function App() {
  return (
    <div className="App">
    
      <Navbar />

      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

    </div>
  );
}