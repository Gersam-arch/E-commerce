import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Signin from "./Pages/Auth/signup";
import Cart from "./Pages/Cart/cart";
import Order from "./Pages/Orders/order";
import Payment from "./Pages/Payment/payment";
import Result from "./Pages/Results/result";
import ProductDetail from "./Pages/ProductDetail/productdetail";

function Routing() {
    return (
        <Router>
            <Routes> 
                <Route path="/" element={<Landing />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Order />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/result" element={<Result />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/category/:categoryName" element={<Result />} />
            </Routes>
        </Router>

    )
}

export default Routing;

