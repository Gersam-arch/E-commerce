import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Cart from "./Pages/Cart/cart";
import Order from "./Pages/Orders/order";
import Payment from "./Pages/Payment/payment";
import Result from "./Pages/Results/result";
import ProductDetail from "./Pages/ProductDetail/productdetail";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/payment"
          element={
            <ProtectedRoute
              msg="You must log in to pay"
              redirect="/auth"
            >
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"You must log in to access your orders"}
              redirect="/orders"
            >
              <Order />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={<Result />}
        />

        <Route
          path="/category/:categoryName"
          element={<Result />}
        />

        <Route
          path="/product/:productId"
          element={<ProductDetail />}
        />
      </Routes>
    </Router>
  );
}

export default Routing;