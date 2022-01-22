import { Routes, Route } from "react-router-dom";

import { Cart, Home, Message } from "../screens";

function PrimaryRouter() {
  return (
    <Routes>
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/messages" element={<Message />} />
      <Route exact path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default PrimaryRouter;
