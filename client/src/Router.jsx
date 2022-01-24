import { Routes, Route } from "react-router-dom";

import { LogIn, SignIn, Main, Owner } from "./screens";
// import { Search, Settings } from "./screens/primary";

export default function Router() {
  return (
    <Routes>
      <Route path="/:cityid/*" element={<Main />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/owner" element={<Owner />}></Route>
    </Routes>
  );
}
