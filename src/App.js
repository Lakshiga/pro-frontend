import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage"; 
import Login from "./Components/Login"; 
import Register from "./Components/Register"; 
import AdminDashboard from "./Components/AdminDashboard"; 
import OrganizerDashboard from "./Components/OrganizerDashboard"; 
import OrganizerSubscribe from "./Components/OrganizerSubscribe"; 
import UserDashboard from "./Components/UserDashboard"; 
import UserProfile from "./Components/UserProfile"; 
import Event from "./Components/Event"; 
import TermsOfService from "./Components/TermsOfService"; 
import PrivacyPolicy from "./Components/PrivacyPolicy"; 
import ContactUs from "./Components/ContactUs"; 
import PrivateRoute from './Components/PrivateRoute';
import ProtectedRoute from './Components/ProtectedRoute'; 

function App() {
  const [user, setUser] = useState({
    role: ''
  });

  // Example: Mock data to simulate user login (replace with actual login logic)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token && role) {
      setUser({
        role: role
      });
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/organizer-subscribe" element={<OrganizerSubscribe />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/organizer-dashboard/event/:id" element={<Event />} /> 
          <Route path="/terms-of-service" element={<TermsOfService />} />    
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />  
          <Route path="/contact-us" element={<ContactUs />} /> 
         
          {/* Protect Admin Dashboard */}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute allowedRoles={['admin']} user={user}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          {/* Protect Organizer Dashboard */}
          <Route
            path="/organizer-dashboard"
            element={
              <PrivateRoute allowedRoles={['organizer']} user={user}>
                <OrganizerDashboard />
                </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
