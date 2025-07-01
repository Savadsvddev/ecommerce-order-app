import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import "./App.css";
import Cart from "./pages/Cart/Cart";
import MyProfile from "./pages/Profile/Profile";
import MyOrders from "./pages/MyOrders/MyOrders";
import ScrollToTop from "./components/ScrollToTop";
import PDDetails from "./pages/ProductDetails/PDDetails";
import LoginPage from "./pages/Login/Login";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import CheckoutPage from "./pages/Checkout/Checkout";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<PDDetails />} />

          {/* Protected Routes */}
          <Route path="/cart" element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          } />
          <Route path="/orders" element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          } />
          <Route path="/checkout" element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          } />
        </Route>

        {/* Public-only route */}
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
