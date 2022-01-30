import { Routes, Route } from "react-router-dom";

import { LogIn, SignIn, Main, Owner, Start, Error } from "./screens";
import { Setting, Home, Messages, Cart } from "./screens/primary";
import {
  Bills,
  Profile,
  OwnerSignIn,
  Updates,
  ReportBug,
} from "./screens/settings";
import { Business, Area, Product } from "./screens/home";
import { Inventory, OwnerHome } from "./screens/owners";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="login" element={<LogIn />} />
      <Route path=":cname/signin" element={<SignIn />} />
      <Route path="404" element={<Error />} />

      {/* Owner Screen Routes */}
      <Route path=":cname/owner" element={<Owner />}>
        <Route path="messages" element={<Messages />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="profile" element={<OwnerHome />} />
      </Route>

      {/* User Screen Routes */}
      <Route path=":cname" element={<Main />}>
        <Route path="home" element={<Home />}>
          <Route path="areas" element={<Area />} />
          <Route path=":bid" element={<Product />} />
          <Route path="businesses" element={<Business />} />
        </Route>
        <Route path="messages" element={<Messages />} />
        <Route path="cart" element={<Cart />} />
        {/* <Route path="search" element={<Search />} /> */}
        <Route path="setting" element={<Setting />}>
          <Route path="userbills" element={<Bills />} />
          <Route path="userprofile" element={<Profile />} />
          <Route path="ownersignin" element={<OwnerSignIn />} />
          <Route path="updates" element={<Updates />} />
          <Route path="report" element={<ReportBug />} />
        </Route>
      </Route>
    </Routes>
  );
}
