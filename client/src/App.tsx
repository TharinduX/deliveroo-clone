import React from "react";
import { Routes, Route } from "react-router-dom";
import RestaurentPage from "./pages/RestaurentPage";
import SignUp from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import Layout from "./components/Layout";
import RequireAuth from "./middleware/RequireAuth";
import Dashboard from "./pages/DashboardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<RestaurentPage />} />
        <Route path="register" element={<SignUp />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
