import { Routes, Route } from "react-router-dom";
import Navbar from "./common/navbar";
import Home from "./common/home";
import ProductPage from "./common/productsPage";
import Cart from "./common/cart";
import ProductDetailPage from "./common/productDetailPage";
import Order from './common/orderProduct';
import OrderOne from './common/orderOneProduct';
import AdminPanel from "./common/admin/adminPanel";
import React from "react";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" exact Component={Home} />
        <Route path="/products" exact Component={ProductPage} />
        <Route path="/products/:id" exact Component={ProductDetailPage} />
        <Route path="/cart" exact Component={Cart} />
        <Route path="/adminPanel" exact Component={AdminPanel} />
        <Route path="/orders" exact Component={Order} />
        <Route path="/order/:id" exact Component={OrderOne} />
      </Routes>
    </div>
  );
}

export default App;

