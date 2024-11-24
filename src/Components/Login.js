
// src/pages/Login.js
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import axios from 'axios';
import logo from '../Images/MM logo.jpeg';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ closeModal, setShowRegisterModal }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', formData);
      const { token, role, verified, _id ,username} = res.data; // Assuming the response includes the umpire's id
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('id', _id); 
      localStorage.setItem('username', username); 
      console.log("==========", _id);
  
      if (role === 'organizer') {
        if (verified) {
          toast.success('Login successful as organizer. Redirecting to your dashboard...');
          setTimeout(() => navigate('/organizer-dashboard'), 2000);
        } else {
          toast.error('Your account is awaiting admin verification.');
        }
      } else if (role === 'admin') {
        toast.success('Login successful as admin. Redirecting to admin dashboard...');
        setTimeout(() => navigate('/admin-dashboard'), 2000);
      } else {
        toast.success('Login successful. Redirecting to user dashboard...');
        setTimeout(() => navigate('/user-dashboard'), 2000);

      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }}
      className="shadow-lg rounded p-4"
      style={{ backgroundColor: '#1a1a1a', borderRadius: '10px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)', zIndex: 1 }}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />

      <div className="card w-100" style={{ maxWidth: '28rem', backgroundColor: 'black' }}>
        <div className="card-header text-center">
          <img src={logo} alt="Match Master Logo" className="logo-square mx-auto mb-2" />
          <h2 className="card-title h4 fw-bold" style={{ color: '#CCFF00' }}>Welcome Back</h2>
          <p className="card-text" style={{ color: '#FFFFFF' }}>Log in to your Match Master account</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label" style={{ color: '#CCFF00' }}>Email</label>
              <input id="email" name="email" placeholder="john@example.com" type="email" className="form-control" required value={formData.email} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{ color: '#CCFF00' }}>Password</label>
              <div className="input-group">
                <input id="password" name="password" type={showPassword ? "text" : "password"} className="form-control" required value={formData.password} onChange={handleInputChange} />
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)} style={{ color: '#CCFF00', borderColor: '#CCFF00' }}>
                  {showPassword ? <FaEye /> : <IoMdEyeOff />}
                </button>
              </div>
            </div>
            <motion.button 
              type="submit" 
              className="btn w-100 mt-3" 
              style={{ backgroundColor: '#CCFF00', color: 'black' }}
              initial={{ scale: 0.9 }} 
              whileHover={{ scale: 1.05 }} 
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Log In
            </motion.button>         
           </form>
        </div>
        <div className="card-footer text-center">
          <p className="card-text text-white">Don't have an account?
            <button onClick={() => setShowRegisterModal(true)} className="btn btn-link text-decoration-none text-warning fw-bold">Register</button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}




