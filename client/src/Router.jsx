import { Routes, Route } from "react-router-dom";

import { Cart, Shop } from "./screens";

function Router() {
  return (
    <Routes>
      <Route exact path="/:areaId/shops" element={<Shop />} />
      <Route exact path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default Router;
