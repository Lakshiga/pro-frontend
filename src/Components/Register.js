import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from '../Images/MatchMaster.png'; // Import your logo here
import Layout from '../Components/Layout.js'; 

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRoleChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      role: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    console.log('Form data:', formData); // Debugging log

    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', formData);
      console.log('Registration successful:', response.data);
      setSuccess(true);
      setFormData({ username: '', email: '', password: '', role: '' });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'An error occurred during registration');
      } else {
        setError('An error occurred during registration');
      }
      console.error('Registration error:', error);
    }
  };

  return (
    <Layout>
      {/* Full-page overlay with semi-transparent background */}
      <div className="min-vh-100 d-flex align-items-center justify-content-center" 
           style={{ position: 'relative', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        
        {/* Register form container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="shadow-lg rounded p-4"
          style={{ backgroundColor: '#1a1a1a', borderRadius: '10px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)', zIndex: 1 }}
        >
          <div className="card w-100" style={{ maxWidth: '28rem', backgroundColor: 'black' }}>
            <div className="card-header text-center">
              <img src={logo} alt="Match Master Logo" className="logo-square mx-auto mb-2" />
              <h2 className="card-title h4 fw-bold" style={{ color: '#CCFF00' }}>Create an Account</h2>
              <p className="card-text" style={{ color: '#FFFFFF' }}>Enter your details to register for Match Master</p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label" style={{ color: '#CCFF00' }}>Name</label>
                  <input 
                    id="name" 
                    name="username" 
                    placeholder="John Doe" 
                    className="form-control" 
                    required 
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={{ color: '#CCFF00' }}>Email</label>
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
                  <label htmlFor="password" className="form-label" style={{ color: '#CCFF00' }}>Password</label>
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
                      onClick={() => setShowPassword(!showPassword)}
                      className="btn btn-outline-secondary"
                      style={{ color: '#CCFF00', borderColor: '#CCFF00' }}
                    >
                      {showPassword ? <IoMdEyeOff size={20} /> : <FaEye size={20} />}
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label" style={{ color: '#CCFF00' }}>Role</label>
                  <select 
                    id="role" 
                    className="form-select" 
                    value={formData.role} 
                    onChange={handleRoleChange} 
                    required
                  >
                    <option value="" disabled>Select your role</option>
                    <option value="player">Player</option>
                    <option value="organizer">Organizer</option>
                    <option value="umpire">Umpire</option>
                  </select>
                </div>
                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">Registration successful!</p>}
                <button type="submit" className="btn w-100 mt-3" style={{ backgroundColor: '#CCFF00', color: 'black' }}>Register</button>
              </form>
            </div>
            <div className="card-footer text-center" style={{ color: 'white' }}>
              <small className="text-white" > By registering, you agree to our    <Link to="/terms-of-service" className="text-decoration-none" style={{ color: '#CCFF00' }}>Terms of Service</Link> and <Link to="/privacy-policy" className="text-decoration-none" style={{ color: '#CCFF00' }}>Privacy Policy</Link>
              </small>
              <div className="mt-2" >
                <small>Already have an account?  <Link to="/login" className="fw-bold text-decoration-none" style={{ color: '#CCFF00' }}>Log in</Link></small>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
