import React, { useState } from 'react'
import { motion } from "framer-motion"
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios'
import logo from '../Images/MatchMaster.png'; // Import your logo here
import "../CSS/Login.css"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', formData);
      console.log('Login successful:', response.data);
      // Here you would typically store the token and redirect the user
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'An error occurred during login');
      } else {
        setError('An error occurred during login');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center custom-gradient p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card w-100" style={{ maxWidth: '28rem' }}>
          <div className="card-header text-center">
          <img src={logo} alt="Match Master Logo" className="logo-square mx-auto mb-2" />
            <h2 className="card-title h4 fw-bold"style={{ color: 'navy' }}>Welcome Back</h2>
            <p className="card-text text-muted">Log in to your Match Master account</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  id="email" 
                  name="email" 
                  placeholder="john@example.com" 
                  type="email" 
                  className="form-control" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <input 
                    id="password" 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    className="form-control" 
                    required 
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IoMdEyeOff size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>
              {error && <p className="text-danger">{error}</p>}
<button type="submit" className="btn w-100 mt-3" style={{ backgroundColor: 'navy', color: 'white' }}>Log In</button>
            </form>
          </div>
          <div className="card-footer text-center">
            <Link to="/forgot-password" className="fw-bold text-decoration-none">Forgot your password?</Link>
            <p className="mt-2">
              Don't have an account ?   
              <Link to="/register" className="fw-bold text-decoration-none">  Register </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}