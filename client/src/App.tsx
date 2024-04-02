import React from "react";
import { Routes, Route } from "react-router-dom";
import RestaurantPage from "./pages/RestaurantPage";
import SignUp from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import Layout from "./components/Layout";
import RequireAuth from "./middleware/RequireAuth";
import Dashboard from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="menu/:slug" element={<RestaurantPage />} />
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
