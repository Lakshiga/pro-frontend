import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage"; // Updated path
import Login from "./Components/Login"; // Updated path
import Register from "./Components/Register"; // Updated path
import AdminDashboard from "./Components/AdminDashboard"; // Updated path
import OrganizerDashboard from "./Components/OrganizerDashboard"; // Updated path

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
