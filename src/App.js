import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../Components/HomePage";
import Login from "../Components/Login";
import Register from "../Components/Register";
import AdminDashboard from "../Components/AdminDashboard";
import OrganizerDashboard from "../Components/OrganizerDashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;