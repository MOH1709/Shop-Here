import React from "react";
import { Route, Routes } from "react-router";
import { Home, Cart, Messages } from "./screens";

function Router() {
  return (
    <Routes>
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/cart" element={<Cart />} />
      <Route exact path="/messages" element={<Messages />} />
    </Routes>
  );
}

export default Router;
