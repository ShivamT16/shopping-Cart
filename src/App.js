import './index.css';
import { Routes, Route } from "react-router-dom";

import { Product } from "./Pages/Product";
import { Cart } from "./Pages/Cart";
import { Checkout } from "./Pages/Checkout";
import { Navbar } from "./Navbar";
import productData from "./Data/test.json"
import { ProductDetail } from "./Pages/ProductDetails";

export default function App() {
  return (
    <div className="App">
    
      <Navbar />

      <Routes>
        <Route path="/" element={<Product products={productData.data} />} />
        <Route path="/productDetail/:id" element={<ProductDetail products={productData.data} />} />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

    </div>
  );
}