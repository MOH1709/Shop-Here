import { Routes, Route } from "react-router-dom";

//-----------------------------------------------> custom components
import { LogIn, SignIn, Main, OwnerMain, Start, Error } from "./screens";
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
  OwnerInventory,
  OwnerProfile,
  OwnerSetting,
  OwnerMessages,
  OwnerAreaSelection,
} from "./screens/owners";
import AdminMain from "./admin/AdminMain";
import {
  Admins,
  AdminAreas,
  AdminCities,
  AdminBussiness,
  AdminLogin,
  AdminUser,
} from "./admin/screens";

export default function Router() {
  const adminId = process.env.REACT_APP_ADMINID;

  return (
    <Routes>
      <Route path="/" element={<Start />} />

      {/* for admins */}
      <Route path={`admin/${adminId}/home`} element={<AdminMain />}>
        <Route path="williamzavier" element={<Admins />} />
        <Route path="cities" element={<AdminCities />} />
        <Route path="areas" element={<AdminAreas />} />
        <Route path="users" element={<AdminUser />} />
        <Route index element={<AdminBussiness />} />
      </Route>
      <Route path={`admin/${adminId}`} element={<AdminLogin />} />

      <Route path="login" element={<LogIn />} />
      <Route path="city/signin" element={<SignIn />} />
      <Route path="*" element={<Error />} />

      {/* Owner Screen Routes */}
      <Route path="city/owner" element={<OwnerMain />}>
        <Route index element={<OwnerMessages />} />
        <Route path="profile" element={<OwnerProfile />} />
        <Route path="inventory" element={<OwnerInventory />} />
        <Route path="setting" element={<OwnerSetting />} />
        <Route path="messages/:oid" element={<ProductViewer />} />
        <Route path="areaSelection" element={<OwnerAreaSelection />} />
      </Route>

      {/* User Screen Routes */}
      <Route path="city" element={<Main />}>
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
