import { Routes, Route } from "react-router-dom";

//-----------------------------------------------> custom components
import { LogIn, SignIn, Main, OwnerMain, Start, Error, Otp } from "./screens";
import {
  Setting,
  Home,
  Messages,
  Cart,
  ProductViewer,
} from "./screens/primary";
import { Profile, Updates, ReportBug } from "./screens/settings";
import { Business, Area, Product } from "./screens/home";
import {
  OwnerInventory,
  OwnerProfile,
  OwnerSetting,
  OwnerMessages,
  OwnerAreaSelection,
  OwnerOrders,
  OrderDetails,
} from "./screens/owners";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />

      <Route path="login" element={<LogIn />} />
      <Route path="otp" element={<Otp />} />
      <Route path="city/signin" element={<SignIn />} />
      <Route path="*" element={<Error />} />

      {/* Owner Screen Routes */}
      <Route path="city/owner" element={<OwnerMain />}>
        <Route path="messages" element={<OwnerMessages />} />
        <Route path="profile" element={<OwnerProfile />} />
        <Route path="inventory" element={<OwnerInventory />} />
        <Route path="setting" element={<OwnerSetting />}>
          <Route path="updates" element={<Updates />} />
          <Route path="report" element={<ReportBug />} />
          <Route path="orders" element={<OwnerOrders />} />
          <Route path="orders/:oid" element={<OrderDetails />} />
        </Route>
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
          <Route path="userprofile" element={<Profile />} />
          <Route path="updates" element={<Updates />} />
          <Route path="report" element={<ReportBug />} />
        </Route>
      </Route>
    </Routes>
  );
}
