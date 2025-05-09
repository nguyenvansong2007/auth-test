"use client";

import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./pages/HomePage";
import Profile from "./components/auth/Profile";
import BoardUser from "./pages/BoardUser";
import BoardModerator from "./pages/BoardModerator";
import BoardAdmin from "./pages/BoardAdmin";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header/Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
