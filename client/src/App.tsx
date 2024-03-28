import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import RestaurentPage from "./pages/RestaurentPage";
import SignUp from "./pages/SignupPage";
import Login from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Toaster />
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<RestaurentPage />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
