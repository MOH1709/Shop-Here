import { Routes, Route } from "react-router-dom";

import { Cart, Home, Messages } from "../screens/mainScreens";

function PrimaryRouter() {
  return (
    <Routes>
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/messages" element={<Messages />} />
      <Route exact path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default PrimaryRouter;
