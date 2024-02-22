import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AccountPage from "./pages/AccountPage";
import UrlsPage from "./pages/UrlsPage";
import RedirectPage from "./pages/RedirectPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route element={<HomePage/>} path="/"/>
      <Route element={<LoginPage/>}  path="/login" />
      <Route element={<SignupPage/>} path="/signup" />
      <Route element={<RedirectPage/>} path="/shared/:identifier" />
      <Route element={<ProtectedRoute><AccountPage/></ProtectedRoute>} path="/account"/>
      <Route element={<ProtectedRoute><UrlsPage/></ProtectedRoute>} path="/urls"/>
    </Routes>
  );
}

export default App;
