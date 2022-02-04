import { Routes, Route } from "react-router-dom";

import { LogIn, SignIn, Main, Owner, Start, Error } from "./screens";
import {
  Setting,
  Home,
  Messages,
  Cart,
  ProductViewer,
} from "./screens/primary";
import { Bills, Profile, Updates, ReportBug } from "./screens/settings";
import { Business, Area, Product } from "./screens/home";
import {
  Inventory,
  OwnerHome,
  OwnerSetting,
  ShopMessages,
  AreaSelection,
} from "./screens/owners";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="login" element={<LogIn />} />
      <Route path=":cname/signin" element={<SignIn />} />
      <Route path="404" element={<Error />} />

      {/* Owner Screen Routes */}
      <Route path=":cname/owner" element={<Owner />}>
        <Route path="profile" element={<OwnerHome />} />
        <Route index element={<ShopMessages />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="setting" element={<OwnerSetting />} />
        <Route path="areaSelection" element={<AreaSelection />} />
      </Route>

      {/* User Screen Routes */}
      <Route path=":cname" element={<Main />}>
        <Route path="home" element={<Home />}>
          <Route path="areas" element={<Area />} />
          <Route path=":bid" element={<Product />} />
          <Route path="businesses" element={<Business />} />
        </Route>
        <Route path="messages" element={<Messages />} />
        <Route path="messages/:oid" element={<ProductViewer />} />
        <Route path="cart" element={<Cart />} />
        {/* <Route path="search" element={<Search />} /> */}
        <Route path="setting" element={<Setting />}>
          <Route path="userbills" element={<Bills />} />
          <Route path="userprofile" element={<Profile />} />
          <Route path="updates" element={<Updates />} />
          <Route path="report" element={<ReportBug />} />
        </Route>
      </Route>
    </Routes>
  );
}
