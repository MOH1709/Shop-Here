import { Routes, Route } from "react-router-dom";

import { Cart } from "./screens";

function Router() {
  return (
    <Routes>
      <Route exact path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default Router;
