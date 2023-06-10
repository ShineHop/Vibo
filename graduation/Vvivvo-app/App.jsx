import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/home/index";
import Recomm from "./pages/recomm/index";
import Mypage from "./pages/mypage/index";
import Like from "./pages/like/index";
import Login from "./pages/login/index";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/recomm" element={<Recomm />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/like" element={<Like />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;