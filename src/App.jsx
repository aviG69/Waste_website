import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import Feedback from "./pages/Feedback";
import Consultant from "./pages/Consultant";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <>
      <Navbar />

      <main style={{ padding: 12 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/consultant" element={<Consultant />} />
          <Route path="/admin" element={<Admin />} />

          {/* ✅ Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </>
  );
}
