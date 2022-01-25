import { Routes, Route } from "react-router-dom";

import { LogIn, SignIn, Main, Owner } from "./screens";
import { Setting, Search, Home, Messages, Cart } from "./screens/primary";
import {
  Bills,
  Profile,
  OwnerSignIn,
  Updates,
  ReportBug,
} from "./screens/settings";

export default function Router() {
  return (
    <Routes>
      <Route path=":cityid" element={<Main />}>
        <Route path="home" element={<Home />} />
        <Route path="messages" element={<Messages />} />
        <Route path="cart" element={<Cart />} />
        <Route path="search" element={<Search />} />
        <Route path="setting" element={<Setting />}>
          <Route path="userbills" element={<Bills />} />
          <Route path="userprofile" element={<Profile />} />
          <Route path="ownersignin" element={<OwnerSignIn />} />
          <Route path="updates" element={<Updates />} />
          <Route path="report" element={<ReportBug />} />
        </Route>
      </Route>
      <Route path="login" element={<LogIn />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="owner" element={<Owner />}></Route>
    </Routes>
  );
}
